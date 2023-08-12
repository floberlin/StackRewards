/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@zerodevapp/wagmi', '@zerodevapp/web3auth']); // pass the modules you would like to see transpiled


const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  daisyui: {
    themes: ["bumblebee"],
  },
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'],
  },
};

module.exports = withTM(nextConfig);
