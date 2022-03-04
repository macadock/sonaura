import { gql } from '@apollo/client';

export const SHOP_FRAGMENT = gql`
  fragment ShopFragment on Shop {
    id
    name
    email
    address
    city
    postalCode
    country
    phoneNumber
    googleMapsUrl
    image {
      id
      url
    }
  }
`;

export const GET_SHOPS = gql`
  ${SHOP_FRAGMENT}
  query Shops {
    shops(stage: PUBLISHED) {
      ...ShopFragment
    }
  }
`;
