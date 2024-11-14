/** @type {import('next').NextConfig} */
// next.config.mjs

const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/proxy/:path*', // Проксі-шлях, який використовуватимете у запитах
          destination: 'https://fittrackapidev.onrender.com/api/:path*', // Адреса зовнішнього API
        },
      ];
    },
  };
  
  export default nextConfig;
