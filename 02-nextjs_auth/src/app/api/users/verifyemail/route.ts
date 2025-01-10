import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { token } = reqBody;
    console.log(token);

    //verifyTokenExpiry: {$gt: Date.now()} means that the token is valid if it was created before the current time
    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }
    console.log(user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
        success: true,
      },
      { status: 200 }
    );

    return NextResponse.json({ message: "Email verified successfully" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
