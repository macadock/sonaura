import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

import NavItem from './NavItem';
import { Categories } from '../../../gql/__generated__/categories';
import { Pages } from '../../../gql/__generated__/pages';
import TopNav from 'components/system/TopNav';
import { ShoppingCartTwoTone } from '@mui/icons-material';
import CartDrawer from '../../core/Cart/CartDrawer';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useCart } from 'react-use-cart';
import pagesToExcludeFromMenu from './exlude-from-menu';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSidebarOpen: () => void;
  pages: Pages['pages'];
  categories: Categories['categories'];
  colorInvert?: boolean;
}

const Topbar: React.FC<Props> = ({
  onSidebarOpen,
  pages,
  categories,
  colorInvert = false,
}) => {
  const { t } = useTranslation('common');
  const [cartState, setCartState] = useState<boolean>(false);
  const theme = useTheme();
  const { mode } = theme.palette;
  const { asPath } = useRouter();
  const { isEmpty } = useCart();

  const handleCart = () => {
    setCartState(!cartState);
  };

  const customPages: Pages['pages'] = [];

  if (categories && pages) {
    pagesToExcludeFromMenu.forEach((exclude) => {
      const category = categories.find((c) => c.slug === exclude.slug);
      if (category !== undefined) {
        customPages.push({
          id: category.id,
          name: category.slug,
          pageType: 'Page',
          title: exclude.name,
          url: `/${category.slug}`,
        });
      }
    });

    customPages.push(...pages);
  }

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href="/"
        title={t('config.website')}
        width={{ xs: 130, md: 200 }}
        sx={{ marginY: '1rem' }}
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
        />
      </Box>

      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        {categories && categories.length !== 0 && (
          <Box>
            <NavItem
              title={t('categories.title')}
              id={'categories-pages'}
              items={categories}
              colorInvert={colorInvert}
            />
          </Box>
        )}
        {customPages &&
          customPages.map((page) => (
            <Box key={page.id}>
              <Link
                sx={{ paddingX: '1rem' }}
                underline="none"
                component="a"
                href={page.url}
                color={colorInvert ? 'common.white' : 'text.primary'}
                fontWeight={asPath.includes(page.url) ? 700 : 400}
              >
                {page.title}
              </Link>
            </Box>
          ))}
        <Box position={'relative'}>
          <Button onClick={handleCart} title={t('cart.title')}>
            <ShoppingCartTwoTone />
          </Button>
          {!isEmpty ? (
            <Box
              width={'0.5rem'}
              height={'0.5rem'}
              sx={{ position: 'absolute', borderRadius: '50%' }}
              bgcolor={theme.palette.red[900]}
              top={'0.5rem'}
              right={'0.6rem'}
            />
          ) : null}
        </Box>
        <Box>
          <TopNav />
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
          {!isEmpty ? (
            <Box
              width={'0.5rem'}
              height={'0.5rem'}
              sx={{ position: 'absolute', borderRadius: '50%' }}
              bgcolor={theme.palette.red[900]}
              top={'0.2rem'}
              right={'0.2rem'}
            />
          ) : null}
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
