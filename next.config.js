/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  runtimeCaching: [
    {
      // Estrategia de caché para archivos de imagen
      urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
        },
      },
    },
    {
      // Estrategia de caché para archivos CSS y JavaScript
      urlPattern: /^https?.*/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources",
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
  // Otras configuraciones de Next.js aquí
});
