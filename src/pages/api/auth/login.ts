import type { APIRoute } from 'astro';
import dbConnect from '../../../lib/db';
import User from '../../../models/User';
import { comparePassword, signToken } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required.' }), { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email or password.' }), { status: 400 });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: 'Invalid email or password.' }), { status: 400 });
    }

    const token = signToken(user._id.toString());
    
    cookies.set('token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'lax',
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 });
  }
};
