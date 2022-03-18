import { gql } from '@apollo/client';

export const PRODUCT_FRAMGENT = gql`
  fragment ProductFragment on Product {
    id
    slug
    name
    description
    price
    mainAsset {
      url(transformation: { image: { resize: { fit: max, width: 1920 } } })
    }
    assets {
      url(transformation: { image: { resize: { fit: max, width: 1920 } } })
    }
    category {
      name
      slug
    }
  }
`;

export const GET_PRODUCT = gql`
  ${PRODUCT_FRAMGENT}
  query Product($slug: String!) {
    product(where: { slug: $slug }) {
      ...ProductFragment
    }
  }
`;

export const GET_PRODUCTS = gql`
  ${PRODUCT_FRAMGENT}
  query Products {
    products {
      ...ProductFragment
    }
  }
`;
