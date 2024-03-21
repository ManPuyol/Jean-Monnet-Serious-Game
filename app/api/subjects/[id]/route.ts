import { deleteSubject } from '@/controllers/subjects';
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
    } catch (error) {
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
  
//   export async function PUT(req: NextRequest, {params}:{ params: { id: number } }) {
//     try {
//         const id = params.id;
//       const { name, price } = req.body;
//       await conn.query("UPDATE product SET name = ?, price = ? WHERE id = ?", [
//         name,
//         price,
//         id,
//       ]);
//       return NextResponse.json(
//         {
//           message: "Subject updated successfully",
//         },
//         {
//           status: 200,
//         }
//       );
//     } catch (error) {
//       console.log(error);
//       return NextResponse.json(
//         {
//           message: error.message,
//         },
//         {
//           status: 500,
//         }
//       );
//     }
//   }