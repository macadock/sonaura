import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';

import NavItem from './NavItem';
import { Categories } from '../../../../gql/__generated__/categories';
import { Pages } from '../../../../gql/__generated__/pages';
import TopNav from 'components/system/TopNav';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSidebarOpen: () => void;
  pages: Pages;
  categories: Categories;
  colorInvert?: boolean;
}

const Topbar: React.FC<Props> = ({
  onSidebarOpen,
  pages,
  categories,
  colorInvert = false,
}) => {
  const theme = useTheme();
  const { mode } = theme.palette;

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
        title="Sonaura"
        width={{ xs: 130, md: 200 }}
        sx={{ marginY: '1rem' }}
      >
        <Box
          component={'img'}
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
        {categories && (
          <Box>
            <NavItem
              title={'Catégories'}
              id={'categories-pages'}
              items={categories.categories}
              colorInvert={colorInvert}
            />
          </Box>
        )}
        {pages &&
          pages.pages.map((page) => (
            <Box key={page.id}>
              <Link
                sx={{ paddingX: '1rem' }}
                underline="none"
                component="a"
                href={page.url}
                color={colorInvert ? 'common.white' : 'text.primary'}
              >
                {page.title}
              </Link>
            </Box>
          ))}
        <Box>
          <TopNav />
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        <Button
          onClick={() => onSidebarOpen()}
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
    </Box>
  );
};

export default Topbar;
