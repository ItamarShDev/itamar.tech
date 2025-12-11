"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

interface AnimatedViewTransitionProps {
	children: React.ReactNode;
}

export default function AnimatedViewTransition({ children }: AnimatedViewTransitionProps) {
	const pathname = usePathname();

	// Determine animation type based on route
	const getTransitionType = () => {
		if (pathname?.includes("/blog")) {
			return "slide-transition";
		}
		if (pathname?.includes("/resume")) {
			return "bottom-up-transition";
		}
		if (pathname?.includes("/example-projects")) {
			return "perspective-transition";
		}
		// Default for home page and others
		return "slow-fade";
	};

	const transitionType = getTransitionType();

	return (
		<ViewTransition 
			default={transitionType}
			enter={transitionType}
			exit={transitionType}
		>
			{children}
		</ViewTransition>
	);
}
