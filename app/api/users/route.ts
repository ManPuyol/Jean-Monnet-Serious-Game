import { allUsers, signUp } from '@/controllers/users';
import { NextResponse, NextRequest } from 'next/server';

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

export async function POST(req: NextRequest){
  try {
    const body = await req.json();
    return NextResponse.json(signUp(body));
  } catch (error){
    console.log(error);
    return NextResponse.json({});
  }

}