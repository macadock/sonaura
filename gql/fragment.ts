import { gql } from 'apollo-server-micro';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    description
    fromPrice
    mainAsset
    price
    quantity
    slug
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    name
    slug
    icon
  }
`;

export const SHOP_FRAGMENT = gql`
  fragment ShopFragment on Shop {
    id
    city
    country
    address
    postalCode
    phoneNumber
    image
    googleMapsUrl
    email
  }
`;
