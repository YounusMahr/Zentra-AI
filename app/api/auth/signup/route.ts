import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Please provide name, email, and password.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'A user with this email address already exists.' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
    });

    await newUser.save();

    // Sign JWT
    const secret = process.env.JWT_SECRET || 'zentra_ai_secure_token_secret_2026';
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email, avatar: newUser.avatar },
      secret,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      message: 'User registered successfully.',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('API Signup Error:', error);
    return NextResponse.json(
      { message: 'Internal server error occurred.' },
      { status: 500 }
    );
  }
}
