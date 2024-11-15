import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (
		[
			"/manifest.json",
			"/favicon.ico",
			// Your other files in `public`
		].includes(pathname)
	)
		return;

	// Check if there is any supported locale in the pathname
	const pathnameIsMissingLocale = ["en", "he"].every(
		(locale) =>
			!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	);

	if (pathnameIsMissingLocale) {
		// Redirect if there is no locale
		const locale = "en";

		// e.g. incoming request is /products
		// The new URL is now /en-US/products

		return NextResponse.redirect(
			new URL(
				`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
				request.url,
			),
		);
	}
	const headers = new Headers(request.headers);
	headers.set("x-current-path", request.nextUrl.pathname);
	headers.set("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
	headers.set("Vary", "Sec-CH-Prefers-Color-Scheme");
	headers.set("Critical-CH", "Sec-CH-Prefers-Color-Scheme");
	return NextResponse.next({ headers });
}

export const config = {
	matcher: ["/((?!api|icons|_next/static|_next/image|favicon.ico).*)"],
};
