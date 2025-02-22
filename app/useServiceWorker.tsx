"use client";
import React, { useEffect } from "react";

const useServiceWorker = () => {
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/public/service-worker.js")
				.then((registration) => {
					console.log(
						"Service Worker registered with scope:",
						registration.scope,
					);
				})
				.catch((error) => {
					console.error("Service Worker registration failed:", error);
				});
		}
	}, []);
};
const ServiceWorkerContext = React.createContext(null);

export function ServiceWorkerProvider({
	children,
}: { children: React.ReactNode }) {
	useServiceWorker();
	return (
		<ServiceWorkerContext.Provider value={null}>
			{children}
		</ServiceWorkerContext.Provider>
	);
}
