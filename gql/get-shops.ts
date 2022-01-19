import gql from "graphql-tag";

export const SHOP_FRAGMENT = gql`
  fragment ShopFragment on Shop {
    id
    name
    address
    city
    postalCode
    country
    phoneNumber
    location {
      latitude
      longitude
    }
    image {
      id
      url
    }
  }
`

export const GET_SHOPS = gql`
${SHOP_FRAGMENT}
query Shops {
  shops(stage: PUBLISHED) {
    ...ShopFragment
  }
}
`