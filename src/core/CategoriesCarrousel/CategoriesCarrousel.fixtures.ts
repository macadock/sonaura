import { GET_CATEGORIES } from '../../../gql/get-categories';

export const Categories = [
  {
    id: 'ckyfqrxegh3ow0b04ti6f1er2',
    name: 'Téléviseurs',
    slug: 'tv',
    file: {
      url: 'https://media.graphcms.com/mB6V2Bb9RYiJLFBSLVjV',
      __typename: 'Asset',
    },
    __typename: 'Category',
  },
  {
    id: 'ckyfqsp6gh5nx0c52hso7teeo',
    name: 'Enceintes',
    slug: 'speakers',
    file: {
      url: 'https://media.graphcms.com/firECZGuRFSErCNyDjAK',
      __typename: 'Asset',
    },
    __typename: 'Category',
  },
  {
    id: 'ckyfqthq8hax30b57yxdfrg2s',
    name: 'Casques',
    slug: 'headphones',
    file: {
      url: 'https://media.graphcms.com/DurWfpMFRKWLSSxviSXw',
      __typename: 'Asset',
    },
    __typename: 'Category',
  },
];

export const CategoriesFixtures = [
  {
    request: {
      query: GET_CATEGORIES,
    },
    result: {
      data: {
        categories: Categories,
      },
    },
  },
];
