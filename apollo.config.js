module.exports = {
  client: {
    includes: ['./apollo/**/*.ts'],
    service: {
      name: 'wanderlost-app',
      url: 'http://localhost:3000/api/graphql',
    },
  },
}
