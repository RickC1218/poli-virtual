/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
            },
        ],
    },
}
