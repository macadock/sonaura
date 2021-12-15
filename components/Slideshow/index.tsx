import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const TIME_INTERVAL_IN_SEC = 1000

export enum MediaType {
    IMAGE = 'image',
    VIDEO = 'video'
}

export type SlideshowMedia = {
    type: MediaType;
    url: string;
    alt: string;
}

interface Props {
    medias: SlideshowMedia[]
}

const Slideshow: React.FC<Props> = ({
    medias,
}) => {

    const [currentMedia, setCurrentMedia] = useState<number>(0);
    const mediaLenght = (medias.length) - 1;

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(`number of medias: ${mediaLenght}`)
            if (mediaLenght >= 1) {

                const isEnd = ((currentMedia + 1) > mediaLenght)
                console.log(`isEnd: ${isEnd}`)

                if ((currentMedia + 1) > mediaLenght) {

                    setCurrentMedia(0)
                    console.log('end of medias')

                } else {

                    setCurrentMedia(currentMedia + 1)
                    console.log('next media')

                }

            }

        }, TIME_INTERVAL_IN_SEC);
        return () => {
            console.log('clear interval')
            clearInterval(interval);
        }
      }, []);

    return (
        <Wrapper>
            <Image src={medias[currentMedia].url} />
        </Wrapper>
    )
}

const Wrapper = styled(Box)`
    width: 100%;
    height: 100%;
`

const Image = styled('img')`
  width: 100%;
  height:80%;
  object-fit:cover;
`

export default Slideshow;