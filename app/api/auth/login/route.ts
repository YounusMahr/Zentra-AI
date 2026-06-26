import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Please provide email and password.' },
        { status: 400 }
      );
    }

    // Find User
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials. User not found.' },
        { status: 400 }
      );
    }

    // Check if password exists (could be a Google OAuth account)
    if (!user.password) {
      return NextResponse.json(
        { message: 'This email is linked with Google Sign-in. Please log in using Google.' },
        { status: 400 }
      );
    }

    // Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials. Password incorrect.' },
        { status: 400 }
      );
    }

    // Sign JWT
    const secret = process.env.JWT_SECRET || 'zentra_ai_secure_token_secret_2026';
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
      secret,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      message: 'Successfully logged in.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    }, { status: 200 });

  } catch (error) {
    console.error('API Login Error:', error);
    return NextResponse.json(
      { message: 'Internal server error occurred.' },
      { status: 500 }
    );
  }
}
