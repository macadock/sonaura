import { gql } from '@apollo/client';

export const INSTALLATION_FRAGMENT = gql`
  fragment InstallationFragment on Installation {
    id
    title
    description
    image {
      url(transformation: { image: { resize: { fit: max, width: 1920 } } })
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