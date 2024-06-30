import { useEffect, useState } from "react";

export default function useScrollbarOnBody(hasScroll) {
	const [isScrollingOnBody, setScrollingOnBody] = useState(hasScroll);
	useEffect(() => {
		setScrollingOnBody(hasScroll);
	}, [hasScroll]);
	useEffect(() => {
		if (process.browser) {
			document.body.style.overflow = isScrollingOnBody ? "auto" : "hidden";
		}
	}, [isScrollingOnBody]);
	return [isScrollingOnBody, setScrollingOnBody];
}
