module.exports = {
  client: {
    includes: ['./components/**/*.tsx'],
    service: {
      name: 'wanderlost',
      localSchemaFile: './schema.graphql',
    },
  },
}
