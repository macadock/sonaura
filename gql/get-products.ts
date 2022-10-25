import { gql } from '@apollo/client';
import { SHOP_FRAGMENT } from './get-shops';

export const COLORS_FRAGMENT = gql`
  fragment ColorsFragment on ProductColor {
    id
    name
    color
    colorCode {
      hex
    }
    __typename
  }
`;

export const SIZES_FRAGMENT = gql`
  fragment SizesFragment on ProductSize {
    id
    name
    size
    __typename
  }
`;

export const POSITIONING_FRAGMENT = gql`
  fragment PositionningsFragment on ProductPositionning {
    id
    name
    positionning
    __typename
  }
`;

export const FRAME_COLORS_FRAGMENT = gql`
  fragment FrameColorsFragment on ProductFrameColor {
    id
    name
    frameColor
    colorCode {
      hex
    }
    __typename
  }
`;

export const SOUNDBAR_COLORS_FRAGMENT = gql`
  fragment SoundbarColorsFragment on ProductSoundbarColor {
    id
    name
    color
    colorCode {
      hex
    }
    __typename
  }
`;

export const SUPPORT_COLORS_FRAGMENT = gql`
  fragment SupportColorsFragment on ProductSupportColor {
    id
    name
    supportColor
    colorCode {
      hex
    }
    __typename
  }
`;

export const ASSETS_BY_PRODUCT_VARIANT_FRAGMENT = gql`
  fragment AssetsByProductVariantFragment on AssetsByProductVariant {
    id
    asset {
      url(transformation: { image: { resize: { fit: max, width: 1920 } } })
    }
    color
    positionning
    soundbarColor
    size
    frameColor
    supportColor
  }
`;

export const PRODUCT_FRAGMENT = gql`
  ${COLORS_FRAGMENT}
  ${SIZES_FRAGMENT}
  ${POSITIONING_FRAGMENT}
  ${FRAME_COLORS_FRAGMENT}
  ${SOUNDBAR_COLORS_FRAGMENT}
  ${SUPPORT_COLORS_FRAGMENT}
  ${SHOP_FRAGMENT}
  ${ASSETS_BY_PRODUCT_VARIANT_FRAGMENT}
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
    isNew
    colors(orderBy: name_ASC) {
      ...ColorsFragment
    }
    sizes(orderBy: name_ASC) {
      ...SizesFragment
    }
    positionnings(orderBy: name_ASC) {
      ...PositionningsFragment
    }
    frameColors(orderBy: name_ASC) {
      ...FrameColorsFragment
    }
    soundbarColors(orderBy: name_ASC) {
      ...SoundbarColorsFragment
    }
    supportColors(orderBy: name_ASC) {
      ...SupportColorsFragment
    }
    quantity
    shops {
      ...ShopFragment
    }
    assetsByProductVariants {
      ...AssetsByProductVariantFragment
    }
  }
`;

export const GET_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  query Product($slug: String!) {
    product(where: { slug: $slug }) {
      ...ProductFragment
    }
  }
`;

export const GET_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  query Products {
    products {
      ...ProductFragment
    }
  }
`;

export const GET_PREOWNED_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  query PreOwnedProducts {
    category(where: { slug: "occasion" }) {
      products {
        ...ProductFragment
      }
    }
  }
`;

export const GET_PRODUCTS_BY_IDS = gql`
  ${PRODUCT_FRAGMENT}
  query GetProductsByIds($ids: [ID!]!) {
    products(where: { id_in: $ids }) {
      ...ProductFragment
    }
  }
`;
