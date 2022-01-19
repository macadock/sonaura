import styled from 'styled-components';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ShopFragment } from '../../../gql/__generated__/shop-fragment';

interface Props {
  shop: ShopFragment;
  imageSide?: 'left' | 'right';
}

const ContactCard: React.FC<Props> = ({ shop, imageSide }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <ShopCard imageside={imageSide} isdesktop={isDesktop}>
      <ShopCardContent isdesktop={isDesktop}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {shop.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {shop.city}
          </Typography>
        </CardContent>
      </ShopCardContent>
      <ShopCardMedia isdesktop={isDesktop} image={shop.image?.url} />
    </ShopCard>
  );
};

const ShopCard = styled(Card)<{
  imageside?: 'left' | 'right';
  isdesktop: boolean;
}>`
  display: flex;
  margin: 1rem;
  flex-direction: ${({ imageside, isdesktop }) => {
    if (isdesktop) {
      if (imageside === 'left') {
        return 'row-reverse';
      }
      return 'row';
    }
    return 'column-reverse';
  }};

  width: 100%;
`;

const ShopCardContent = styled(Box)<{ isdesktop: boolean }>`
  display: flex;
  width: ${({ isdesktop }) => (isdesktop ? '50%' : '100%')};
`;

const ShopCardMedia = styled(CardMedia).attrs({
  component: 'img',
})<{ isdesktop: boolean }>`
  width: ${({ isdesktop }) => (isdesktop ? '50%' : '100%')};
`;

export default ContactCard;
