import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApiUrls, getRoutePath } from '../appConstants';

export const client = new ApolloClient({
  uri: getRoutePath({ api: ApiUrls.GRAPHQL_ENDPOINT }),
  cache: new InMemoryCache(),
});
