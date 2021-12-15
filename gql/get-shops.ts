import gql from "graphql-tag";

export const GET_SHOPS = gql`
query Shops {
  shops(stage: PUBLISHED) {
    id
    name
    address
    city
    country
    stage
  }
}
`