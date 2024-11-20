import createMDX from "@next/mdx";

const nextConfig = {
	bundlePagesRouterDependencies: true,
	images: {
		domains: ["media.giphy.com"],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

const withMDX = createMDX({
	experimental: {
		mdxRs: true,
	},
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
