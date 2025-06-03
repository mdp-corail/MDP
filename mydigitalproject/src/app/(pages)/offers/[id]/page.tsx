import { prisma } from '@/app/lib/prisma';
import { notFound } from 'next/navigation';
import { Box, Button, Stack, Typography, Divider, Chip } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import TranslateIcon from '@mui/icons-material/Translate';
import PeopleIcon from '@mui/icons-material/People';
import BackButton from '@/app/components/BackButton/BackButton';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function OfferDetailsPage({ params }: PageProps) {
    // Await params before using its properties
    const { id } = await params;

    const offer = await prisma.offer.findUnique({
        where: { id },
        include: {
            company: true,
            applications: {
                select: {
                    id: true,
                    status: true
                }
            }
        },
    });

    if (!offer) return notFound();

    // Compter les candidatures par statut
    const totalApplications = offer.applications.length;
    const pendingApplications = offer.applications.filter(app => app.status === 'PENDING').length;
    const acceptedApplications = offer.applications.filter(app => app.status === 'ACCEPTED').length;
    const refusedApplications = offer.applications.filter(app => app.status === 'REFUSED').length;

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <BackButton />
            <Typography variant="h3" fontWeight="bold" mb={2} mt={2}>
                {offer.title}
            </Typography>

            {/* Affichage du nombre de candidatures */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <Chip
                    icon={<PeopleIcon />}
                    label={`${totalApplications} candidature${totalApplications > 1 ? 's' : ''}`}
                    color="primary"
                    sx={{ backgroundColor: "secondary.main", p:1 }}
                />
            </Box>

            <Divider sx={{ my: 2, borderColor: "#3A3A3A", width: "100%" }} />
            <Stack spacing={3} mb={2}>
                <InfoLine icon={<RoomIcon />} label="Localisation" text={offer.country} />
                <InfoLine icon={<AccessTimeIcon />} label="Durée" text={offer.duration} />
                <InfoLine icon={<GroupIcon />} label="Personnes" text={`${offer.people}`} />
                <InfoLine icon={<TranslateIcon />} label="Langue" text={offer.language} />
                <InfoLine icon={null} label="Secteur" text={offer.sector} />
                <InfoLine icon={<PeopleIcon />} label="Candidatures" text={`${totalApplications} reçue${totalApplications > 1 ? 's' : ''}`} />
            </Stack>
            <Divider sx={{ my: 2, borderColor: "#3A3A3A", width: "100%" }} />
            <Typography variant="body1" mb={4}>
                {offer.description}
            </Typography>
            <Button
                color="primary"
                href={`/offers/${id}/apply`}
                sx={{ width: "231px" }}
            >
                Postuler
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