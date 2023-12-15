import { NextRequest, NextResponse } from 'next/server'
import connectMongoDB from '../../../../lib/mongodb';
import StoreModel from '../../../../models/store';
 
export function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({msg:"api"})
}
export async function POST(req: NextRequest, res: NextResponse) {
  const {lat,lon} = await req.json();
  await connectMongoDB();
  let temp = await StoreModel.aggregate([
    {
      $geoNear: {
        near: { 
          type: "Point",
          coordinates: [ lon , lat]
        },
        distanceField: "dist.calculated",
        spherical: true
     }
    }
]);
  return NextResponse.json({stores:temp});
}