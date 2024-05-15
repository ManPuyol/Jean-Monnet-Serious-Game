import { deleteSubject, updateSubject } from '@/controllers/subjects';
import { InsertSubject } from '@/schemas/subjects';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, {params}:{ params: { id: number } }) {
    try {
      const id = params.id;
      await deleteSubject(id);
      return NextResponse.json(
        {
          message: "Subject deleted successfully",
        },
        {
          status: 200,
        }
      );
    } catch (error: any) {
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
  
export async function PUT(req: NextRequest, {params}:{ params: { id: number } }) {
  try {
      const id = params.id;
      const body = await req.json()
      const subject : InsertSubject = body as InsertSubject;
      await updateSubject(id, subject);
      
    return NextResponse.json(
      {
        message: "Subject updated successfully",
      },
      {
        status: 200,
      }
    );
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