import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Middleware for all routes
export function middleware(req: NextRequest) {
	// Get the authorization from header
	const authHeader = req.headers.get('authorization');

	// If no authHeader, redirect to login page
	if (!authHeader) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	const token = authHeader.split(' ')[1];

	try {
		// Verify the token
		jwt.verify(token, process.env.JWT_SECRET);
		// If token is valid, proceed to the next middleware or API route
		return NextResponse.next();
	} catch (err) {
		// If token is invalid or expired, redirect to login
		return NextResponse.redirect(new URL('/login', req.url));
	}
}

// Define the paths where the middleware should be applied
export const config = {
	matcher: ['/api/class/:path*', '/api/session/:path*', '/api/student/:path*'],
};