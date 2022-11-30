import { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
// In rewrite method you pass a page folder name(as a string). which // you create to handle underConstraction  functionalty.
export function middleware(req, ev) {
    console.log('req')
    console.log(req)
//   return NextResponse.rewrite("/underConstraction");
}