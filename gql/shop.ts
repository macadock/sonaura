import { gql } from 'apollo-server-micro';
import { SHOP_FRAGMENT } from './fragment';

export const GET_SHOPS = gql`
  ${SHOP_FRAGMENT}
  query Shops {
    shops {
      ...ShopFragment
    }
  }
`;

export const GET_SHOPS_BY_ID = gql`
  ${SHOP_FRAGMENT}
  query ShopById($id: String!) {
    shopById(id: $id) {
      ...ShopFragment
    }
  }
`;

export const CREATE_SHOP = gql`
  ${SHOP_FRAGMENT}
  mutation CreateShop($createShopInput: CreateShopInput!) {
    createShop(createShopInput: $createShopInput) {
      ...ShopFragment
    }
  }
`;

export const UPDATE_SHOP = gql`
  ${SHOP_FRAGMENT}
  mutation UpdateShop($updateShopInput: UpdateShopInput!) {
    updateShop(updateShopInput: $updateShopInput) {
      ...ShopFragment
    }
  }
`;

export const DELETE_SHOP = gql`
  ${SHOP_FRAGMENT}
  mutation DeleteShop($id: String!) {
    deleteShop(id: $id) {
      ...ShopFragment
    }
  }
`;
