"use client";
import { usePathname } from "next/navigation";
import { type ReactNode, ViewTransition } from "react";
export default function AnimatedViewTransition({
	children,
}: {
	children: ReactNode;
}) {
	const pathname = usePathname();
	return (
		<ViewTransition
			key={pathname}
			default="none"
			enter="page-enter"
			exit="page-exit"
		>
			{children}
		</ViewTransition>
	);
}
