
import { prisma } from '@/app/lib/prisma';
import { notFound } from 'next/navigation';
import { Box, Button, Stack, Typography, Divider } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import TranslateIcon from '@mui/icons-material/Translate';
import { Metadata } from 'next';
import BackButton from '@/app/components/BackButton/BackButton';

interface Props {
    params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const offer = await prisma.offer.findUnique({ where: { id: params.id } });
    return {
        title: offer?.title ?? 'Offre introuvable',
    };
}

export default async function OfferDetailsPage({ params }: { params: { id: string } }) {
    const offer = await prisma.offer.findUnique({
        where: { id: params.id },
        include: { company: true },
    });

    if (!offer) return notFound();

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <BackButton />
            <Typography variant="h3" fontWeight="bold" mb={2} mt={2}>
                {offer.title}
            </Typography>

            <Divider sx={{ my: 2, borderColor: "#3A3A3A", width: "100%" }} />

            <Stack spacing={3} mb={2}>
                <InfoLine icon={<RoomIcon />} label="Localisation" text={offer.country} />
                <InfoLine icon={<AccessTimeIcon />} label="Durée" text={offer.duration} />
                <InfoLine icon={<GroupIcon />} label="Personnes" text={`${offer.people}`} />
                <InfoLine icon={<TranslateIcon />} label="Langue" text={offer.language} />
                <InfoLine icon={null} label="Secteur" text={offer.sector} />
            </Stack>

            <Divider sx={{ my: 2, borderColor: "#3A3A3A", width: "100%" }} />

            <Typography variant="body1" mb={4}>
                {offer.description}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 2, px: 4 }}
                href={`/offers/${params.id}/apply`}
            >
                Postuler à cette offre
            </Button>
        </Box>
    );
}

const InfoLine = ({
    icon,
    label,
    text,
}: {
    icon: React.ReactNode;
    label: string;
    text: string;
}) => (
    <Stack direction="row" alignItems="center" spacing={1}>
        {icon && <Box color="primary.main">{icon}</Box>}
        <Typography variant="body1">
            <strong>{label}:</strong> {text}
        </Typography>
    </Stack>
);
