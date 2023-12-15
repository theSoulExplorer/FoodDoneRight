import { NextRequest, NextResponse } from 'next/server'
import connectMongoDB from "../../../../lib/mongodb"
import StoreModel from "../../../../models/store"

export async function POST(req: NextRequest, res: NextResponse) {
  const {name,address,lat,lon} = await req.json();
  await connectMongoDB();
  await StoreModel.create({
    name,
    address,
    location: { type: "Point", coordinates: [parseFloat(lon), parseFloat(lat)] }
  });
  return NextResponse.json({message:"Store Created"},{status:201});
}