import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { websiteUrl } from '../appConstants';

const link = createHttpLink({ uri: `${websiteUrl}/api/graphql` });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
