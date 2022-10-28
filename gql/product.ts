import { gql } from 'apollo-server-micro';
import { CATEGORY_FRAGMENT, PRODUCT_FRAGMENT, SHOP_FRAGMENT } from './fragment';

export const GET_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  query Products {
    products {
      ...ProductFragment
      category {
        ...CategoryFragment
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  ${PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  query ProductById($id: String!) {
    productById(id: $id) {
      ...ProductFragment
      category {
        ...CategoryFragment
      }
    }
  }
`;

export const GET_PRODUCT_BY_IDS = gql`
  ${PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  query ProductByIds($ids: [String!]!) {
    productByIds(ids: $ids) {
      ...ProductFragment
      category {
        ...CategoryFragment
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  ${PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  query Product($slug: String!) {
    productBySlug(slug: $slug) {
      ...ProductFragment
      category {
        ...CategoryFragment
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${SHOP_FRAGMENT}
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      ...ProductFragment
      category {
        ...CategoryFragment
      }
      shop {
        ...ShopFragment
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${SHOP_FRAGMENT}
  mutation UpdateProduct($updateProductInput: UpdateProductInput!) {
    updateProduct(updateProductInput: $updateProductInput) {
      ...ProductFragment
      category {
        ...CategoryFragment
      }
      shop {
        ...ShopFragment
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${SHOP_FRAGMENT}
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id) {
      ...ProductFragment
    }
  }
`;
