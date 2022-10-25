import { makeSchema, connectionPlugin } from 'nexus';
import { join } from 'path';
import * as types from './types';

export const schema = makeSchema({
  types,
  plugins: [connectionPlugin()],
  outputs: {
    typegen: join(process.cwd(), 'graphql', 'index.d.ts'),
    schema: join(process.cwd(), 'graphql', 'schema.graphql'),
  },
  contextType: {
    export: 'Context',
    module: join(process.cwd(), 'graphql', 'context.ts'),
  },
});