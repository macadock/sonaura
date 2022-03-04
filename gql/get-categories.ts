import { gql } from '@apollo/client';
import { PRODUCT_FRAMGENT } from './get-products';

export const CATEGORY_FRAGMENT = gql`
  ${PRODUCT_FRAMGENT}
  fragment CategoryFragment on Category {
    id
    name
    slug
    file {
      url
    }
    products {
      ...ProductFragment
    }
  }
`;

export const GET_CATEGORIES = gql`
  ${CATEGORY_FRAGMENT}
  query Categories {
    categories {
      ...CategoryFragment
    }
  }
`;

export const GET_CATEGORY = gql`
  ${CATEGORY_FRAGMENT}
  query Category($slug: String!) {
    category(where: { slug: $slug }) {
      ...CategoryFragment
    }
  }
`;
