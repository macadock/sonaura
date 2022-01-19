import { GET_PAGES_HEADER } from '../../../gql/get-pages';

export const Pages = [
  {
    id: 'ckyfzgnw0j94f0a50zzpsuoou',
    name: 'accueil',
    pageType: 'Home',
    title: 'Accueil',
    url: '/',
    __typename: 'Page',
  },
  {
    id: 'ckyg0zq54juwm0b04jczpki3z',
    name: 'categories',
    pageType: 'Page',
    title: 'Catégories',
    url: '/categories',
    __typename: 'Page',
  },
  {
    id: 'ckyg109fkjweg0b45npsbm9yt',
    name: 'professionnels',
    pageType: 'Page',
    title: 'Professionnels',
    url: '/professionnels',
    __typename: 'Page',
  },
  {
    id: 'ckyg11ye0jxr20c52r9fzhfn6',
    name: 'realisations',
    pageType: 'Page',
    title: 'Réalisations',
    url: '/realisations',
    __typename: 'Page',
  },
  {
    id: 'ckyg129yojxhq0b06mzuvyyjp',
    name: 'contact',
    pageType: 'Page',
    title: 'Contact',
    url: '/contact',
    __typename: 'Page',
  },
];

export const PagesFixtures = [
  {
    request: {
      query: GET_PAGES_HEADER,
    },
    result: {
      data: {
        pages: Pages,
      },
    },
  },
];
