import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (pathname === "/he" || pathname.startsWith("/he/")) {
		const url = request.nextUrl.clone();
		url.pathname = `/en${pathname.slice(3)}`;
		return NextResponse.redirect(url, 308);
	}
	if (
		/\.(?:avif|css|gif|ico|jpe?g|js|json|png|svg|txt|webp|woff2?|ttf|pdf|webmanifest)$/i.test(
			pathname
		)
	) {
		return NextResponse.next();
	}
	if (pathname !== "/en" && !pathname.startsWith("/en/")) {
		const url = request.nextUrl.clone();
		url.pathname = `/en${pathname}`;
		return NextResponse.redirect(url);
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|icons|project-artwork/|_next/static|_next/image|favicon.ico).*)",
	],
};
