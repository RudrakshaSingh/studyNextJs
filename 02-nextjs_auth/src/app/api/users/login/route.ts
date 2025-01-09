import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Password is incorrect" }, { status: 400 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ error: "Email is not verified" }, { status: 400 });
    }

    const tokenData = { id: user._id, username: user.username, email: user.email };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });//! makes it know it will come,if not we are responsible

    const response = NextResponse.json({
      message: "User logged in successfully",
      success: true,
      user,
    });

    response.cookies.set("token", token, {
      httpOnly: true, //only server can access cookie and user cannot change them only see them
    });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
