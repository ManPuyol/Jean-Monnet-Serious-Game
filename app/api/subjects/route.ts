import { addSubject, allSubjects, deleteSubject } from '@/controllers/subjects';
import { InsertSubject } from '@/schemas/subjects';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  try {
    const results = allSubjects()
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

// insert subject on POST route
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const subject : InsertSubject = body as InsertSubject;
    await addSubject(subject);

    return NextResponse.json(
      {
        message: "Subject added successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(error);
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