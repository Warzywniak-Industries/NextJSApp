module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
  // Add other configurations if needed
  webpack: (config, { isServer }) => {
    // Custom webpack configuration
    return config;
  },
};