"use client";

import { useCallback, useEffect, useState } from "react";

export default function useUrlHash(hash) {
	const [currentUrlHash, setCurrentUrlHash] = useState<string>();
	const updateCurrentHash = useCallback(() => {
		if (location.hash !== currentUrlHash) {
			setCurrentUrlHash(location.hash);
		}
	}, [currentUrlHash]);
	useEffect(() => {
		window.addEventListener("hashchange", updateCurrentHash, false);
		return () => {
			window.removeEventListener("hashchange", updateCurrentHash);
		};
	}, [updateCurrentHash]);

	return currentUrlHash === `#${hash}`;
}
