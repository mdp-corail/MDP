// src/app/register/success/page.tsx
'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterSuccess() {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/');
        }, 3000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, gap: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Compte créé avec succès !
            </Typography>
            <Typography>Redirection vers votre page de profil</Typography>
            <CircularProgress color="primary" />
        </Box>
    );
}
