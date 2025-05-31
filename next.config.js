/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	// output:'export',
	reactStrictMode: false,
	experimental: {
		typedRoutes: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https', // Allow images over HTTPS
				hostname: '**', // Match any domain
				port: '', // Match any port (default is empty, meaning any port)
				pathname: '**', // Match any path (image file names, folders, etc.)
			},
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'a0.muscache.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'www.gstatic.com',
				port: '',
				pathname: '/**',
			},
		],
	},
}

module.exports = nextConfig
