import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

import NavItem from './NavItem';
import ShoppingCartTwoTone from '@mui/icons-material/ShoppingCartTwoTone';
import CartDrawer from '../../core/Cart/CartDrawer';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useCart } from 'react-use-cart';
import moveCategoryToPage from './exlude-from-menu';
import { Typography } from '@mui/material';
import { useSiteData } from 'contexts/data';

interface Props {
  onSidebarOpen: () => void;
  colorInvert?: boolean;
}

const Topbar: React.FC<Props> = ({ onSidebarOpen, colorInvert = false }) => {
  const { t } = useTranslation('common');
  const { categories, pages } = useSiteData();
  const [cartState, setCartState] = useState<boolean>(false);
  const theme = useTheme();
  const { mode } = theme.palette;
  const { asPath } = useRouter();
  const { isEmpty } = useCart();

  const redPillRefDesktop = useRef<HTMLDivElement>();
  const redPillRefMobile = useRef<HTMLDivElement>();

  const handleCart = () => {
    setCartState(!cartState);
  };

  useEffect(() => {
    if (!redPillRefDesktop.current || !redPillRefMobile.current) return;
    if (!isEmpty) {
      redPillRefDesktop.current.style.visibility = 'visible';
      redPillRefMobile.current.style.visibility = 'visible';
    } else {
      redPillRefDesktop.current.style.visibility = 'hidden';
      redPillRefMobile.current.style.visibility = 'hidden';
    }
  }, [isEmpty]);

  const [customCategories, customPages] = moveCategoryToPage(categories, pages);

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box width={210}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          component="a"
          href="/"
          title={t('config.website')}
          sx={{
            textDecoration: 'none',
          }}
        >
          <Box
            component={'img'}
            alt={t('config.website')}
            src={
              mode === 'light' && !colorInvert
                ? '/assets/logos/logo.svg'
                : '/assets/logos/logo-negative.svg'
            }
            height={1}
            width={1}
            marginTop={'1rem'}
          />
          <Typography
            marginTop={'.5rem'}
            component={'p'}
            color={theme.palette.text.primary}
            variant="caption"
          >
            {'Distributeur Bang & Olufsen Auvergne Rhône-Alpes'}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        {customCategories && customCategories.length !== 0 && (
          <Box>
            <NavItem
              title={t('categories.title')}
              id={'categories-pages'}
              items={customCategories}
              colorInvert={colorInvert}
            />
          </Box>
        )}
        {customPages &&
          customPages.map((page) => (
            <Box key={page.slug}>
              <Link
                sx={{ paddingX: { md: 0.8, lg: 2 } }}
                underline="none"
                component="a"
                href={page.slug}
                color={colorInvert ? 'common.white' : 'text.primary'}
                fontWeight={asPath.includes(page.slug) ? 700 : 400}
              >
                {page.name}
              </Link>
            </Box>
          ))}
        <Box position={'relative'}>
          <Button onClick={handleCart} title={t('cart.title')}>
            <ShoppingCartTwoTone />
          </Button>
          <Box
            ref={redPillRefDesktop}
            width={'0.5rem'}
            height={'0.5rem'}
            sx={{ position: 'absolute', borderRadius: '50%' }}
            visibility={'hidden'}
            bgcolor={theme.palette.red[900]}
            top={'0.5rem'}
            right={'0.6rem'}
          />
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={handleCart}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            marginRight: '1rem',
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <ShoppingCartTwoTone sx={{ position: 'relative' }} />
          <Box
            ref={redPillRefMobile}
            width={'0.5rem'}
            height={'0.5rem'}
            sx={{ position: 'absolute', borderRadius: '50%' }}
            bgcolor={theme.palette.red[900]}
            top={'0.2rem'}
            right={'0.2rem'}
          />
        </Button>
        <Button
          onClick={onSidebarOpen}
          aria-label="Menu"
          variant={'outlined'}
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
      <CartDrawer open={cartState} onClose={handleCart} />
    </Box>
  );
};

export default Topbar;
