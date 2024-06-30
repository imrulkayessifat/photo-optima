/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.shopify.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ucarecdn.com',
                port: '',
                pathname: '/**'
            }
        ],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
