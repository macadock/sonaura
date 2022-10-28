import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  installation: any;
}

const Card: React.FC<Props> = ({ installation }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginBottom: { xs: 2, sm: 3 },
        '&:last-child': { marginBottom: 0 },
      }}
    >
      <Box
        boxShadow={1}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2,
          '&:hover': {
            '& img': {
              transform: 'scale(1.2)',
            },
            '& .portfolio-massonry__main-item': {
              bottom: 0,
            },
          },
          '& .lazy-load-image-loaded': {
            display: 'flex !important',
          },
        }}
      >
        <Box
          component={LazyLoadImage}
          height={1}
          width={1}
          src={installation.images[0].url}
          alt="..."
          effect="blur"
          maxHeight={{ xs: 400, sm: 600, md: 1 }}
          sx={{
            transition: 'transform .7s ease !important',
            transform: 'scale(1.0)',
            objectFit: 'cover',
            filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
          }}
        />
        <Box
          position={'absolute'}
          bottom={'-100%'}
          left={0}
          right={0}
          padding={4}
          bgcolor={'background.paper'}
          className={'portfolio-massonry__main-item'}
          sx={{ transition: 'bottom 0.3s ease 0s' }}
        >
          <Box
            component={'svg'}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1920 100.1"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              transform: 'translateY(-90%)',
              zIndex: 2,
              width: 1,
            }}
          >
            <path
              fill={theme.palette.background.paper}
              d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
            ></path>
          </Box>
          <Typography variant={'h6'} fontWeight={700} gutterBottom>
            {installation.title}
          </Typography>
          <Typography>{installation.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
