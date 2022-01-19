import { GET_SHOPS } from '../../../gql/get-shops';

export const Shops = [
  {
    address: '13 Rue Montorge',
    city: 'Grenoble',
    country: 'France',
    id: 'ckww3kf804tkg0b57v2ooadfc',
    name: 'Bang & Olufsen Grenoble',
    postalCode: '38000',
    phoneNumber: '+33 4 76 47 49 93',
    location: {
      latitude: 45.1913047,
      longitude: 5.7255587,
      __typename: 'Location',
    },
    __typename: 'Shop',
    image: {
      id: 'ckyfz160ojcts0b063xiswaw1',
      url: 'https://media.graphcms.com/cD1l7AF7QAGFTAeQsIVv',
      __typename: 'Asset',
    },
  },
  {
    address: '14 Rue des Archers',
    city: 'Lyon',
    country: 'France',
    id: 'ckww3mv6o4vg90b05a9vd3x6h',
    name: 'Bang & Olufsen Lyon',
    postalCode: '69002',
    phoneNumber: '+33 4 72 41 74 03',
    location: {
      latitude: 45.7592246,
      longitude: 4.834355899999999,
      __typename: 'Location',
    },
    __typename: 'Shop',
    image: {
      id: 'ckyfz1m80jb2c0b041fnfmeib',
      url: 'https://media.graphcms.com/78CBcm8cRgSdnzC8pFA3',
      __typename: 'Asset',
    },
  },
];

export const ShopsFixtures = [
  {
    request: {
      query: GET_SHOPS,
    },
    result: {
      data: {
        shops: Shops,
      },
    },
  },
];
