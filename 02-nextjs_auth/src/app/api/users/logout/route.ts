import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";


connect();

export  async function GET() {
  try {

    const response=NextResponse.json({ message: "User logged out successfully",success:true }, { status: 200 });

    response.cookies.set("token", "", {expires: new Date(0),httpOnly: true});
    return response;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message },{status: 500});
  }
}
