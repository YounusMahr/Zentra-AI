import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { User, UserDocument } from './user.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  // Generate JWT token for an authenticated user session
  private generateToken(user: UserDocument): string {
    const secret = process.env.JWT_SECRET || 'zentra_ai_secure_token_secret_2026';
    return jwt.sign(
      { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
      secret,
      { expiresIn: '24h' }
    );
  }

  // 1. Traditional Signup handler
  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    if (!name || !email || !password) {
      throw new BadRequestException('Please provide name, email, and password.');
    }

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('A user with this email address already exists.');
    }

    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user entry
      const newUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      });

      await newUser.save();
      const token = this.generateToken(newUser);

      return {
        message: 'User registered successfully.',
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
        },
      };
    } catch (error) {
      console.error('Signup Service Error:', error);
      throw new InternalServerErrorException('An error occurred during registration.');
    }
  }

  // 2. Traditional Login handler
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('Please provide email and password.');
    }

    // Find user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid credentials. User not found.');
    }

    // Link check for Google accounts
    if (!user.password) {
      throw new BadRequestException(
        'This email is linked with Google Sign-in. Please log in using Google.',
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials. Password incorrect.');
    }

    const token = this.generateToken(user);

    return {
      message: 'Successfully logged in.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    };
  }

  // 3. Google Sign-In verification handler
  async googleSignIn(credential: string) {
    if (!credential) {
      throw new BadRequestException('Google credential token is missing.');
    }

    try {
      // Verify Google ticket
      const ticket = await this.googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const { sub: googleId, email, name, picture } = payload;

      if (!email) {
        throw new BadRequestException('Google account does not provide an email address.');
      }

      // Try finding user by googleId
      let user = await this.userModel.findOne({ googleId });

      if (!user) {
        // Try finding user by email
        user = await this.userModel.findOne({ email });

        if (user) {
          // Link account
          user.googleId = googleId;
          if (!user.avatar) user.avatar = picture;
          await user.save();
        } else {
          // Create new OAuth user
          user = new this.userModel({
            name,
            email,
            googleId,
            avatar: picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
          });
          await user.save();
        }
      }

      const token = this.generateToken(user);

      return {
        message: 'Google login successful.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      };
    } catch (error) {
      console.error('Google Sign-in service error:', error);
      throw new InternalServerErrorException('Error occurred during Google verification.');
    }
  }
}
