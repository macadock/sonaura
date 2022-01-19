import { gql } from "@apollo/client";

export const PAGE_FRAGMENT = gql`
    fragment PageFragment on Page {
        id
        name
        pageType
        title
        url
    }
`

export const GET_PAGES_HEADER = gql`
    ${PAGE_FRAGMENT}
    query Pages {
        pages(where: {pageType: Page}) {
            ...PageFragment
        }
    }
`