require('dotenv').config()
module.exports = {
  env: {
    endpoint: process.env.ENDPOINT,
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