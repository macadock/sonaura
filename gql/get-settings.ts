import gql from "graphql-tag";

export const GET_SETTINGS = gql`
query Settings {
    settings {
    title
    logo {
      url
    }
  }
}
`