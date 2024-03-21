import { allUsers } from '@/controllers/users';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
       const results = await allUsers()
      return NextResponse.json(results);
    } catch (error: any) {
      console.log(error);
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }