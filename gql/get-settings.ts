import { gql } from '@apollo/client';

export const SETTING_FRAGMENT = gql`
  fragment SettingFragment on Setting {
    title
    logo {
      url
    }
  }
`;

export const GET_SETTINGS = gql`
  ${SETTING_FRAGMENT}
  query Settings {
    settings {
      ...SettingFragment
    }
  }
`;
