import gql from "graphql-tag";

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    name
    slug
    file {
      url
    }
  }
`

export const GET_CATEGORIES = gql`
${CATEGORY_FRAGMENT}
query Categories {
    categories {
      ...CategoryFragment
    }
  }
`

export const GET_CATEGORY = gql`
${CATEGORY_FRAGMENT}
query Category ($slug: String!) {
  category(where: {slug: $slug}) {
    ...CategoryFragment
  }
}


`


  
  