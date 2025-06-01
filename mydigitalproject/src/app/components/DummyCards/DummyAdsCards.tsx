'use client';

import { Card, CardContent, Stack, Typography, Box } from '@mui/material';

const adsCardsData = [
    { id: 1, title: 'International', image: '/images/ads1.png' },
    { id: 2, title: 'Événements', image: '/images/ads2.png' },
    { id: 3, title: 'Long terme', image: '/images/ads3.png' },
];

const AdsCard = ({ title, image }: { title: string; image: string }) => (
    <Card
        sx={{
            width: '330px',
            height: '264px',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
);

const DummyAdsCards = () => {
    return (
        <>
            {adsCardsData.map((card) => (
                <AdsCard key={card.id} title={card.title} image={card.image} />
            ))}
        </>
    );
};

export default DummyAdsCards;
