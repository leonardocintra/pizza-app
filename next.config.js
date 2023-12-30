/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'platform-lookaside.fbsbx.com',
			},
			{
				protocol: 'https',
				hostname: 'leonardo-pizzaapp.s3.sa-east-1.amazonaws.com',
			},
			{
				protocol: 'https',
				hostname: 'leonardo-pizzaapp.s3.amazonaws.com',
			},
		],
	},
}
module.exports = nextConfig
