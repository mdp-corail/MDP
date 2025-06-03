'use client';

import Slider from 'react-slick';
import { Card, CardContent, Stack, Typography, Box } from '@mui/material';
import Link from 'next/link';

type AdCard = {
    id: number;
    title: string;
    image: string;
    link: string;
};

const adsCardsData: AdCard[] = [
    { id: 1, title: 'International', image: '/images/ads1.png', link: '/offers' },
    { id: 2, title: 'Événements', image: '/images/ads2.png', link: '/events' },
    { id: 3, title: 'Long terme', image: '/images/ads3.png', link: '/offers' },
];

const FeatureCard = ({ title, image, link }: { title: string; image: string, link: string }) => (
    <Link href={link} style={{ textDecoration: 'none' }}>
        <Card
            sx={{
                width: "330px",
                height: "264px",
                borderRadius: "20px",
                position: "relative",
                overflow: "hidden",
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: 'primary.main',
                mx: 'auto',
            }}
        >
            {/* Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: '#BBE3FC',
                    opacity: 0.75,
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <CardContent
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Stack direction="column" gap="70px" alignItems="center" justifyContent="center">
                    <Typography variant="h4" sx={{ fontSize: 32, fontWeight: 600, color: 'primary.main' }}>
                        {title}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    </Link>
);
const CarouselAds = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
    };

    return (
        <Box sx={{ width: '100%', maxWidth: "350px" }}>
            <Slider {...settings}>
                {adsCardsData.map((card) => (
                    <Box key={card.id} px={1}>
                        <FeatureCard title={card.title} image={card.image} link={card.link} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default CarouselAds;
