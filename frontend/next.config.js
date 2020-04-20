module.exports = {
  env: {
    endpoint: 'http://localhost:4000/graphql',
    prodEndpoint: 'https://ecommerce-prisma-apollo-prod.herokuapp.com/graphql',
    perPage: 4,
  },
  typescript: {
    ignoreDevErrors: true,
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    //
    // This option is rarely needed, and should be reserved for advanced
    // setups. You may be looking for `ignoreDevErrors` instead.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}