import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import * as jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json(
        { message: 'Google credential token is missing.' },
        { status: 400 }
      );
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return NextResponse.json(
        { message: 'Invalid token payload.' },
        { status: 400 }
      );
    }

    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      return NextResponse.json(
        { message: 'Google account does not provide an email address.' },
        { status: 400 }
      );
    }

    // Try finding user by googleId
    let user = await User.findOne({ googleId });

    if (!user) {
      // Check if user already exists with same email traditionally
      user = await User.findOne({ email });

      if (user) {
        // Link Google ID to existing profile
        user.googleId = googleId;
        if (!user.avatar) user.avatar = picture;
        await user.save();
      } else {
        // Register new OAuth profile
        user = new User({
          name,
          email,
          googleId,
          avatar: picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || '')}`,
        });
        await user.save();
      }
    }

    // Sign JWT
    const secret = process.env.JWT_SECRET || 'zentra_ai_secure_token_secret_2026';
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
      secret,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      message: 'Google login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('API Google Auth Error:', error);
    return NextResponse.json(
      { message: 'Internal server error occurred during Google verification.' },
      { status: 500 }
    );
  }
}
