import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	bundlePagesRouterDependencies: true,
	images: {
		domains: ["media.giphy.com"],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		mdxRs: true,
	},
	async headers() {
		return [
			{
				source: "/sw.js",
				headers: [
					{
						key: "Content-Type",
						value: "application/javascript; charset=utf-8",
					},
					{
						key: "Cache-Control",
						value: "no-cache, no-store, must-revalidate",
					},
					{
						key: "Content-Security-Policy",
						value: "default-src 'self'; script-src 'self'",
					},
				],
			},
		];
	},
};

const withMDX = createMDX({});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
