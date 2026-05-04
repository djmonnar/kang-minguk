const isGitHubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  ...(isGitHubPages
    ? {
        basePath: "/kang-minguk",
        assetPrefix: "/kang-minguk"
      }
    : {})
};

export default nextConfig;
