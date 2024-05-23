import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

import Container from 'components/system/Container';
import { useTranslation } from 'next-i18next';
import { useSiteData } from 'contexts/data';

const Contact: React.FC = () => {
  const { shops } = useSiteData();
  return (
    <Box sx={{ display: { sm: 'block', md: 'flex' } }}>
      {shops
        ? shops.map((shop) => (
            <Box
              maxWidth={{ sm: 1, md: '50%' }}
              key={shop.id}
              sx={{
                width: 1,
                height: 1,
                overflow: 'hidden',
              }}
            >
              <Container
                paddingX={0}
                paddingY={0}
                maxWidth={{ sm: 1, md: 1236 }}
              >
                <Box
                  display={'flex'}
                  flexDirection={{ xs: 'column', md: 'row' }}
                  position={'relative'}
                >
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    width={1}
                    order={{ xs: 2, md: 1 }}
                  >
                    <Container>
                      <Details shopId={shop.id} />
                      <Map shopId={shop.id} />
                    </Container>
                  </Box>
                </Box>
              </Container>
              <Divider />
            </Box>
          ))
        : null}
    </Box>
  );
};

interface Props {
  shopId: string;
}

const Details: React.FC<Props> = ({ shopId }) => {
  const { t } = useTranslation('contact');
  const theme = useTheme();
  const { shops } = useSiteData();

  const shop = useMemo(() => {
    return shops.find((shop) => shop.id === shopId);
  }, [shopId, shops]);

  return (
    <Box marginX={{ sm: 0, md: 5 }}>
      <Box marginBottom={2}>
        <Typography variant={'h4'} sx={{ fontWeight: 700 }} gutterBottom>
          {shop.city}
        </Typography>
        {/* <Typography color="text.secondary">
          Description sur le magasin...
        </Typography> */}
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        marginBottom={4}
      >
        <Box component={ListItem} disableGutters width={'auto'} padding={0}>
          <Box
            component={ListItemAvatar}
            minWidth={'auto !important'}
            marginRight={2}
          >
            <Box
              component={Avatar}
              bgcolor={theme.palette.secondary.main}
              width={40}
              height={40}
            >
              <svg
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </Box>
          </Box>
          <a
            href={`tel:${shop.phoneNumber.trim()}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemText primary={t('phone')} secondary={shop.phoneNumber} />
          </a>
        </Box>
        <Box component={ListItem} disableGutters width={'auto'} padding={0}>
          <Box
            component={ListItemAvatar}
            minWidth={'auto !important'}
            marginRight={2}
          >
            <Box
              component={Avatar}
              bgcolor={theme.palette.secondary.main}
              width={40}
              height={40}
            >
              <svg
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </Box>
          </Box>
          <a
            href={`mailto:${shop.email}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemText primary={t('email')} secondary={shop.email} />
          </a>
        </Box>
        <Box component={ListItem} disableGutters width={'auto'} padding={0}>
          <Box
            component={ListItemAvatar}
            minWidth={'auto !important'}
            marginRight={2}
          >
            <Box
              component={Avatar}
              bgcolor={theme.palette.secondary.main}
              width={40}
              height={40}
            >
              <svg
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </Box>
          </Box>
          <ListItemText
            primary={t('address')}
            secondary={shop.address + ', ' + shop.postalCode + ' ' + shop.city}
          />
        </Box>
      </Box>
    </Box>
  );
};

const Map: React.FC<Props> = ({ shopId }) => {
  const theme = useTheme();
  const { shops } = useSiteData();

  const shop = useMemo(() => {
    return shops.find((shop) => shop.id === shopId);
  }, [shopId, shops]);

  return (
    <React.Fragment>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        title="map"
        marginHeight={0}
        marginWidth={0}
        scrolling="no"
        src={shop.googleMapsUrl}
        style={{
          display: 'flex',
          minHeight: 400,
          filter:
            theme.palette.mode === 'dark'
              ? 'grayscale(0.5) opacity(0.7)'
              : 'none',
        }}
      />
    </React.Fragment>
  );
};

export default Contact;
