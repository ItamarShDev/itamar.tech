"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { type Dictionary, getTranslations } from "translations";

export function useTranslation<P extends keyof Dictionary>(key: P) {
	const params = useParams();
	const [translations, setTranslations] = useState<Dictionary[P] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const locale = (params?.lang as string) ?? "en";
		async function fetchTranslations() {
			try {
				setIsLoading(true);
				const data = await getTranslations(locale, key);
				console.log(data);
				setTranslations(data);
			} catch (err) {
				setError(err instanceof Error ? err : new Error("Unknown error"));
			} finally {
				setIsLoading(false);
			}
		}

		fetchTranslations();
	}, [key, params]);

	return { translations, isLoading, error };
}
