import { gql } from 'apollo-server-micro';
import { CATEGORY_FRAGMENT, PRODUCT_FRAGMENT } from './fragment';

export const GET_CATEGORIES = gql`
  ${CATEGORY_FRAGMENT}
  query Categories {
    categories {
      ...CategoryFragment
    }
  }
`;

export const GET_CATEGORY_BY_ID = gql`
  ${PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  query CategoryById($id: String!) {
    categoryById(id: $id) {
      ...CategoryFragment
      products {
        ...ProductFragment
      }
    }
  }
`;

export const GET_CATEGORY_BY_SLUG = gql`
  ${PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  query CategoryBySlug($slug: String!) {
    categoryBySlug(slug: $slug) {
      ...CategoryFragment
      products {
        ...ProductFragment
      }
    }
  }
`;

export const GET_PREOWNED_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  query CategoryBySlug {
    categoryBySlug(slug: "occasion") {
      ...CategoryFragment
      products {
        ...ProductFragment
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  ${CATEGORY_FRAGMENT}
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      ...CategoryFragment
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  ${CATEGORY_FRAGMENT}
  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput) {
      ...CategoryFragment
    }
  }
`;

export const DELETE_CATEGORY = gql`
  ${CATEGORY_FRAGMENT}
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id) {
      ...CategoryFragment
    }
  }
`;
