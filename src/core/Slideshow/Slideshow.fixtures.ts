import { GET_SLIDESHOW_ASSETS } from '../../../gql/get_slideshow_assets';

export const Slides = [
  {
    id: 'ckyfxgfkwizwr0b066jjn5yln',
    alt: 'Image 1',
    __typename: 'SlideshowAsset',
    asset: {
      id: 'ckwrkynvsfzgf0d60my9sxl9n',
      url: 'https://media.graphcms.com/2bO6TiwRceKrqvZNqwCY',
      __typename: 'Asset',
    },
  },
  {
    id: 'ckyfxit88iyyf0b04mjnpseo5',
    alt: 'Image 2',
    __typename: 'SlideshowAsset',
    asset: {
      id: 'ckyfxiekgj4ns0b57muse2rso',
      url: 'https://media.graphcms.com/ei22f7heSQuujmbSKBql',
      __typename: 'Asset',
    },
  },
];

export const SlideshowFixtures = [
  {
    request: {
      query: GET_SLIDESHOW_ASSETS,
    },
    result: {
      data: {
        slideshowAssets: Slides,
      },
    },
  },
];
