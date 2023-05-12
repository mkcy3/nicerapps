module.exports = {
  //FIXME:reactStrictMode breaks playwright headlessui mobile-menu test
  reactStrictMode: true,
  transpilePackages: ['db'],
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
}
