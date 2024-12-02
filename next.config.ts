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
};

const withMDX = createMDX({});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
