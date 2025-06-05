'use client';

import Slider from 'react-slick';
import { Card, CardContent, Stack, Typography, Box } from '@mui/material';

const cardsData = [
    {
        id: 1,
        image: "/images/adsdetail-freemium.png",
    },
    {
        id: 2,
        image: "/images/adsdetail-premium.png",
    },
    {
        id: 3,
        image: "/images/adsdetail-devis.png",
    }
]

const FeatureCard = ({ image }: { image: string }) => (

            <Stack direction="column" gap="70px" alignItems="center" justifyContent="center">
                <img src={image} alt="Détails d'un abonnement" style={{ padding: "0px 20px"}}/>
            </Stack>

);

const CarouselPlansDetails = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        centerMode: true,
        centerPadding: '10px',
    };

    return (
        <Box sx={{ width: '100%', maxWidth: "350px" }}>
            <Slider {...settings}>
                {cardsData.map((card) => (
                    <FeatureCard key={card.id} image={card.image} />
                ))}
            </Slider>
        </Box>
    );
};

export default CarouselPlansDetails;
