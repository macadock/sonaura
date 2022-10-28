import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './graphql/schema.graphql',
  documents: ['./gql/*.ts'],
  generates: {
    './gql/types/': {
      preset: 'client',
      plugins: [],
    },
  },
  require: ['ts-node/register'],
};

export default config;
