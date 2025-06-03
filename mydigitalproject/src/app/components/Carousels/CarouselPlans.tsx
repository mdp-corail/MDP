'use client';

import Slider from 'react-slick';
import { Card, CardContent, Stack, Typography, Box } from '@mui/material';

const cardsData = [
    { id: 1, title: 'Freemium', description: '0€/mois' },
    { id: 2, title: 'Premium', description: '25.99€/mois' },
    { id: 3, title: 'Entreprise', description: 'Sur devis' },
];

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
    <Card
        sx={{
            width: 220,
            height: 279,
            borderRadius: "20px",
            background: 'linear-gradient(180deg, #086AA6 0%, #032940 100%)',
            color: 'primary.light',
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
                <Typography variant="h3" sx={{ fontSize: 30 }}>
                    {description}
                </Typography>
            </Stack>
        </CardContent>
    </Card>
);

const CarouselPlans = () => {
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
        <Box sx={{ width: '100%', maxWidth: "350px"}}>
            <Slider {...settings}>
                {cardsData.map((card) => (
                    <Box key={card.id} px={1}>
                        <FeatureCard title={card.title} description={card.description} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default CarouselPlans;
