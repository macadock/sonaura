import styled from 'styled-components';
import { Box } from '@mui/material';
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { SlideshowAssets } from '../../../gql/__generated__/slideshow-assets';
import { GET_SLIDESHOW_ASSETS } from '../../../gql/get_slideshow_assets';
import LoadingScreen from '../LoadingScreen';

const TIME_INTERVAL_MS = 4500;

interface Props {
  width?: string | 'fullWidth';
  heightToRemove?: string;
}

const Slideshow: React.FC<Props> = ({ width, heightToRemove }) => {
  const { data: slideshowAssets, loading } =
    useQuery<SlideshowAssets>(GET_SLIDESHOW_ASSETS);

  const [currentElement, setCurrentElement] = useState<number>(0);
  const [nbOfElements, setNbOfElements] = useState<number>(0);

  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    if (slideshowAssets) {
      setNbOfElements(slideshowAssets.slideshowAssets.length);
    }
  }, [slideshowAssets]);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentElement((prevCurrentElement) =>
          prevCurrentElement === nbOfElements - 1 ? 0 : prevCurrentElement + 1,
        ),
      TIME_INTERVAL_MS,
    );

    return () => {
      resetTimeout();
    };
  }, [currentElement]);

  const handleNext = () => {
    setCurrentElement((prevCurrentElement) =>
      prevCurrentElement === nbOfElements - 1 ? 0 : prevCurrentElement + 1,
    );
  };

  const handlePrevious = () => {
    setCurrentElement((prevCurrentElement) => {
      return prevCurrentElement - 1 < 0
        ? nbOfElements - 1
        : prevCurrentElement - 1;
    });
  };

  const element = slideshowAssets?.slideshowAssets[currentElement];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Wrapper width={width} heightToRemove={heightToRemove}>
      {nbOfElements > 1 && (
        <LeftArrow>
          <ArrowCircleLeft fontSize="large" onClick={handlePrevious} />
        </LeftArrow>
      )}

      {nbOfElements > 1 && (
        <RightArrow>
          <ArrowCircleRight fontSize="large" onClick={handleNext} />
        </RightArrow>
      )}

      <Image src={element?.asset.url} alt={element?.alt} />
    </Wrapper>
  );
};

const Wrapper = styled(Box)<{ width?: string; heightToRemove?: string }>`
  height: ${({ heightToRemove }) =>
    heightToRemove ? 'calc( 100vh - ' + heightToRemove + ' )' : '100vh'};
  width: ${({ width }) => (width ? width : '100%')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-position: center;
`;

const Image = styled('img')`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const LeftArrow = styled(Box)`
  position: absolute;
  left: 1rem;
`;

const RightArrow = styled(Box)`
  position: absolute;
  right: 1rem;
`;

export default Slideshow;
