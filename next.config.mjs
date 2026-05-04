const isGitHubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/kang-minguk" : ""
  },
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
