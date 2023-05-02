import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import NavItem from '../NavItem';
import Link from '@mui/material/Link';
import TopNav from 'components/system/TopNav';
import { useTranslation } from 'next-i18next';

import { useSiteData } from 'contexts/data';
import moveCategoryToPage from 'components/system/Topbar/exlude-from-menu';

const SidebarNav: React.FC = () => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const { mode } = theme.palette;

  const { categories, pages } = useSiteData();
  const [customCategories, customPages] = moveCategoryToPage(categories, pages);

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
        {customCategories.length !== 0 && (
          <Box>
            <NavItem title={t('categories.title')} items={categories} />
          </Box>
        )}
        {customPages.map((page) => (
          <Box key={page.slug} sx={{ marginBottom: '.8rem' }}>
            <Link
              underline="none"
              component="a"
              href={page.slug}
              color="text.primary"
            >
              {page.name}
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
