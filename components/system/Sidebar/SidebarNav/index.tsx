import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import NavItem from '../NavItem';
import { Link } from '@mui/material';
import TopNav from 'components/system/TopNav';
import { useTranslation } from 'next-i18next';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pages: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any;
}

const SidebarNav: React.FC<Props> = ({ pages, categories }) => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={'flex'}
          component="a"
          href="/"
          title={t('config.website')}
          width={{ xs: 100, md: 120 }}
          sx={{ marginTop: '1rem' }}
        >
          <Box
            component={'img'}
            alt={t('config.website')}
            src={
              mode === 'light'
                ? '/assets/logos/logo.svg'
                : '/assets/logos/logo-negative.svg'
            }
            height={1}
            width={1}
          />
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        {categories.length !== 0 && (
          <Box>
            <NavItem title={t('categories.title')} items={categories} />
          </Box>
        )}
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
