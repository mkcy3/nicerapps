module.exports = {
  //breaks headlessui in react 18
  reactStrictMode: true,
  transpilePackages: ['db'],
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
}
