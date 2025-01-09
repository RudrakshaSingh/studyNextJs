import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    //extract data from token
    const userId = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select("-password");

    //check if there is no user
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    return NextResponse.json({ message: "user found", data: user }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
