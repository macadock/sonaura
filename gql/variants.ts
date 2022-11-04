import { gql } from 'apollo-server-micro';
import { VARIANT_FRAGMENT, VARIANT_VALUE_FRAGMENT } from './fragment';

export const GET_VARIANTS_BY_PRODUCT_ID = gql`
  ${VARIANT_FRAGMENT}
  ${VARIANT_VALUE_FRAGMENT}
  query VariantsByProductId($id: String!) {
    variantsByProductId(id: $id) {
      ...VariantFragment
      values {
        ...VariantValueFragment
      }
    }
  }
`;

export const CREATE_VARIANT = gql`
  ${VARIANT_FRAGMENT}
  ${VARIANT_VALUE_FRAGMENT}
  mutation CreateVariant($createVariantInput: CreateVariantInput!) {
    createVariant(createVariantInput: $createVariantInput) {
      ...VariantFragment
      values {
        ...VariantValueFragment
      }
    }
  }
`;

export const UPDATE_VARIANT = gql`
  ${VARIANT_FRAGMENT}
  ${VARIANT_VALUE_FRAGMENT}
  mutation UpdateVariant($updateVariantInput: UpdateVariantInput!) {
    updateVariant(updateVariantInput: $updateVariantInput) {
      ...VariantFragment
      values {
        ...VariantValueFragment
      }
    }
  }
`;

export const DELETE_VARIANT = gql`
  ${VARIANT_FRAGMENT}
  ${VARIANT_VALUE_FRAGMENT}
  mutation DeleteVariant($id: String!) {
    deleteVariant(id: $id) {
      ...VariantFragment
    }
  }
`;
