'use client';

import { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import OfferCards from '@/app/components/OfferCards/OfferCards';
import { Offer } from '@prisma/client';
import OffersFilters from '@/app/components/OffersFilters/OffersFilters';
import BackButton from '@/app/components/BackButton/BackButton';


export default function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await fetch('/api/offers/list');
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Erreur');
                setOffers(data);
            } catch (err) {
                console.error(err);
                setError('Erreur lors du chargement des offres.');
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    if (loading) return <Box textAlign="center"><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', py: 4 }}>
            <BackButton />
            <OffersFilters />
            {offers.map((offer) => (
                <OfferCards 
                key={offer.id}
                    id={offer.id}
                    companyName={offer.companyId} 
                    logoUrl={''}
                    title={offer.title}
                    location={offer.country}
                    duration={offer.duration}
                    people={offer.people.toString()}
                    languages={offer.language} />
            ))}
        </Box>
    );
}
