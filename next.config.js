/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

const nextConfig = withPWA({
    pwa: {
        dest: 'public',
    },
});

module.exports = nextConfig;
