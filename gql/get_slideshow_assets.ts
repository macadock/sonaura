import { gql } from "@apollo/client"

export const SLIDESHOW_ASSET_FRAGMENT = gql`
    fragment SlideshowAssetFragment on SlideshowAsset {
        id
        alt
        asset {
            id
            url
        }
    }
`

export const GET_SLIDESHOW_ASSETS = gql`
    ${SLIDESHOW_ASSET_FRAGMENT}
    query SlideshowAssets {
    slideshowAssets {
      ...SlideshowAssetFragment
    }
  }
`