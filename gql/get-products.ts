import { gql } from '@apollo/client';

export const COLORS_FRAGMENT = gql`
  fragment ColorsFragment on ProductColor {
    id
    name
    color
    colorCode {
      hex
    }
  }
`;

export const SIZES_FRAGMENT = gql`
  fragment SizesFragment on ProductSize {
    id
    name
    size
  }
`;

export const POSITIONNINGS_FRAGMENT = gql`
  fragment PositionningsFragment on ProductPositionning {
    id
    name
    positionning
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
  }
`;

export const PRODUCT_FRAMGENT = gql`
  ${COLORS_FRAGMENT}
  ${SIZES_FRAGMENT}
  ${POSITIONNINGS_FRAGMENT}
  ${FRAME_COLORS_FRAGMENT}
  ${SOUNDBAR_COLORS_FRAGMENT}
  ${SUPPORT_COLORS_FRAGMENT}
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
    sounbarColors(orderBy: name_ASC) {
      ...SoundbarColorsFragment
    }
    supportColors(orderBy: name_ASC) {
      ...SupportColorsFragment
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
