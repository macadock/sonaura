import { gql } from '@apollo/client';

export const INSTALLATION_FRAGMENT = gql`
  fragment InstallationFragment on Installation {
    id
    description
    image {
      url
    }
  }
`;

export const GET_INSTALLATIONS = gql`
  ${INSTALLATION_FRAGMENT}
  query Installations {
    installations(orderBy: createdAt_DESC) {
      ...InstallationFragment
    }
  }
`;
