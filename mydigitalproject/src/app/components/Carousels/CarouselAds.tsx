'use client';

import Slider from 'react-slick';
import { Card, CardContent, Stack, Typography, Box } from '@mui/material';

const cardsData = [
    { id: 1, title: 'International', image: '/images/ads1.png' },
    { id: 2, title: 'Événements', image: '/images/ads2.png' },
    { id: 3, title: 'Long terme', image: '/images/ads3.png' },
];

const FeatureCard = ({ title, image }: { title: string; image: string }) => (
    <Card
        sx={{
            width: "300px",
            height: "244px",
            borderRadius: "20px",
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'primary.main',
            mx: 'auto',
        }}
    >
        <CardContent
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Stack direction="column" gap="70px" alignItems="center" justifyContent="center">
                <Typography variant="h4" sx={{ fontSize: 28, fontWeight: 'bold' }}>
                    {title}
                </Typography>
            </Stack>
        </CardContent>
    </Card>
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
                {cardsData.map((card) => (
                    <Box key={card.id} px={1}>
                        <FeatureCard title={card.title} image={card.image} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default CarouselAds;
