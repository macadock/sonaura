import { ApolloClient, InMemoryCache } from '@apollo/client';
import { vercelUrl } from '../appConstants';

const getGqlRoute = (): string => {
  const url = vercelUrl;
  console.log(url);
  return `${url}/api/graphql`;
};

export const client = new ApolloClient({
  uri: getGqlRoute(),
  cache: new InMemoryCache(),
});
