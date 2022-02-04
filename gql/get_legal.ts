import gql from "graphql-tag";

export const LEGAL_FRAGMENT = gql`
  fragment LegalFragment on Legal {
    privacyPolicy
    legalNotice
  }
`

export const GET_LEGALS = gql`
${LEGAL_FRAGMENT}
query Legal {
    legals {
      ...LegalFragment
  }
}
`