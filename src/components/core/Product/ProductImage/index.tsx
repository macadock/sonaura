import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Product } from '../../../../../gql/__generated__/product';

interface Props {
  product: Product;
}

const ProductImage: React.FC<Props> = ({ product }) => {
  const media = [product.product.mainAsset, ...product.product.assets];

  const [current, setCurrent] = useState(media[0]);
  return (
    <Box>
      {current && (
        <Box
          sx={{
            marginBottom: 2,
            width: 1,
            height: 'auto',
            '& img': {
              width: 1,
              height: 1,
              objectFit: 'cover',
              borderRadius: 2,
            },
          }}
        >
          <img src={current.url} alt={product.product.name} />
        </Box>
      )}
      <Stack
        direction={'row'}
        spacing={2}
        alignItems={'center'}
        flexWrap={'wrap'}
      >
        {media.map((item, i) => (
          <Box
            key={i}
            onClick={() => setCurrent(item)}
            sx={{
              width: 80,
              height: 'auto',
              cursor: 'pointer',
              '& img': {
                width: 1,
                height: 1,
                objectFit: 'cover',
                borderRadius: 2,
              },
            }}
          >
            <img src={item.url} alt={product.product.name} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ProductImage;
