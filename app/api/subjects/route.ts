import { addSubject, allSubjects } from '@/controllers/subjects';
import { InsertSubject } from '@/schemas/subjects';
import { NextResponse, NextRequest } from 'next/server';

export async function GET() {
  try {
    const results = allSubjects()
    return NextResponse.json(results);
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

// insert subject on POST route
export async function POST(req: NextRequest) {
  try {
    console.log("REQUEST ",req);
    console.log("BODY", req.body);
    const subject : InsertSubject = req.body as InsertSubject;
    await addSubject(subject);

    return NextResponse.json(
      {
        message: "Subject added successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
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

// export async function DELETE(req) {
//   try {
//     const { id } = req.query;
//     await conn.query("DELETE FROM product WHERE id = ?", [id]);
//     return NextResponse.json(
//       {
//         message: "Product deleted successfully",
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         message: error.message,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// export async function PUT(req) {
//   try {
//     const { id } = req.query;
//     const { name, price } = req.body;
//     await conn.query("UPDATE product SET name = ?, price = ? WHERE id = ?", [
//       name,
//       price,
//       id,
//     ]);
//     return NextResponse.json(
//       {
//         message: "Product updated successfully",
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         message: error.message,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }