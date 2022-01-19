import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GET_SHOPS } from '../../../gql/get-shops';
import { Shops } from '../../../gql/__generated__/shops';

const Footer: React.FC = () => {
  const { data } = useQuery<Shops>(GET_SHOPS);

  return (
    <Container>
      <Copyright>&copy; Sonaura 2022</Copyright>
      <ShopsWrapper>
        <SectionTitle>Nos boutiques</SectionTitle>
        <ShopsList>
          {data?.shops.map((shop) => (
            <Shop key={shop.id}>
              <ShopName>{shop.name}</ShopName>
              <ShopAttributes>{shop.address}</ShopAttributes>
              <ShopAttributes>
                {shop.postalCode} {shop.city}
              </ShopAttributes>
              <ShopAttributes>{shop.country}</ShopAttributes>
              <ShopAttributes>{shop.phoneNumber}</ShopAttributes>
            </Shop>
          ))}
        </ShopsList>
      </ShopsWrapper>
      <AboutWrapper>
        <SectionTitle>&Agrave; propos</SectionTitle>
      </AboutWrapper>
    </Container>
  );
};

const Copyright = styled(Typography)``;

const Container = styled(Box)`
  color: ${({ theme }) => theme.palette.common.white};
  max-width: 100%;
  background-color: ${({ theme }) => theme.palette.common.black};
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
`;

const ShopsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled(Typography)``;

const ShopsList = styled(Box)`
  display: flex;
  flex-direction: row;
`;

const Shop = styled(Box)`
  margin-right: 1rem;
`;

const ShopName = styled(Typography)``;

const ShopAttributes = styled(Typography)``;

const AboutWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export default Footer;
