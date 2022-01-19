import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import NavItem from './components/NavItem';
import { Link, Typography } from '@mui/material';

import { CategoryFragment } from '../../../../../../../gql/__generated__/category-fragment';
import { PageFragment } from '../../../../../../../gql/__generated__/pages';
import TopNav from 'components/TopNav';

interface Props {
  pages: PageFragment[];
  categories: CategoryFragment[];
}

const SidebarNav: React.FC<Props> = ({ pages, categories }) => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href="/"
          title="theFront"
          width={{ xs: 100, md: 120 }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                color:
                  mode === 'light'
                    ? theme.palette.primary.main
                    : theme.palette.common.white,
              }}
            >
              Sonaura
            </Typography>
          </Box>
          {/* <Box
            component={'img'}
            src={
              mode === 'light'
                ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg'
                : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'
            }
            height={1}
            width={1}
          /> */}
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box>
          <NavItem title={'Categories'} items={categories} />
        </Box>
        {pages.map((page) => (
          <Box key={page.id} sx={{ marginBottom: '.8rem' }}>
            <Link
              underline="none"
              component="a"
              href={page.url}
              color="text.primary"
            >
              {page.title}
            </Link>
          </Box>
        ))}
        <Box>
          <TopNav />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarNav;
