import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {

    const token = await getToken({req, secret: process.env.JWT_SECRET});

    const { pathname } = req.nextUrl;

    if(pathname.includes('/api/auth') || token)
    {
        return NextResponse.next();
    }

    if(pathname == '/')
    {
        console.log("REDIRECTING TO LOGIN...")
        return NextResponse.redirect('/login');
    }

    if(!token && pathname !== '/login')
    {
        console.log('TOKEN INVALID : redirecting to login');
        return NextResponse.redirect('/login');
    }

}