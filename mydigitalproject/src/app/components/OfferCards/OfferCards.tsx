'use client';

import { Card, CardContent, Typography, Box, Stack, Button, Divider, Avatar } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import TranslateIcon from '@mui/icons-material/Translate';
import Link from 'next/link';

type OfferProps = {
    id: string;
    companyName: string;
    logoUrl: string;
    title: string;
    location: string;
    duration: string;
    people: string;
    languages: string;
};

export default function OfferCard({
    id,
    companyName,
    logoUrl,
    title,
    location,
    duration,
    people,
    languages,
}: OfferProps) {
    return (
        <Card
            sx={{
                width: 300,
                borderRadius: 4,
                boxShadow: 4,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 2,
            }}
        >
            <Box display="flex" justifyContent="center">
                <Avatar src={logoUrl} alt={companyName} sx={{ width: 100, height: 100 }} />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                sx={{ fontSize: '20px', mb: 1 }}
            >
                {title}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1} sx={{ px: 1 }}>
                <InfoLine icon={<RoomIcon />} text={location} />
                <InfoLine icon={<AccessTimeIcon />} text={duration} />
                <InfoLine icon={<GroupIcon />} text={people} />
                <InfoLine icon={<TranslateIcon />} text={languages} />
            </Stack>

            <Box textAlign="center" mt={3}>
                <Link href={`/offers/${id}`}>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            backgroundColor: '#333',
                            px: 4,
                            '&:hover': { backgroundColor: '#111' },
                        }}
                    >
                        Découvrir
                    </Button>
                </Link>
            </Box>
        </Card>
    );
}

const InfoLine = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{ color: '#333', display: 'flex', alignItems: 'center' }}>{icon}</Box>
        <Typography sx={{ fontSize: '15px' }}>{text}</Typography>
    </Stack>
);
