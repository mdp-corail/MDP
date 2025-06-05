'use client';

import { Box, Typography, Stack, useMediaQuery, ListItemButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import EastIcon from '@mui/icons-material/East';


export default function RegisterSelection() {
    const isMobile = useMediaQuery('(max-width: 1200px)');
    const router = useRouter();
    const buttons = [
        { label: 'Un particulier', href: '/register/worker' },
        { label: 'Une entreprise', href: '/register/company' },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                justifyContent: 'center',
                p: isMobile ? 3 : 6,
                textAlign: 'center',
            }}
        >
            <Typography variant="h2" sx={{ mb: 6, color: '#086AA6', fontWeight: 'bold' }}>
                Vous êtes :
            </Typography>

            <Stack direction="column" spacing={isMobile ? 4 : 2} sx={{ width: isMobile ? '100%' : '400px' }}>
                {buttons.map(({ label, href }) => (
                    <ListItemButton
                    disableRipple
                        key={label}
                        onClick={() => router.push(href)}
                        sx={{
                            backgroundColor: 'primary.light',
                            color: 'primary.main',
                            py: 2,
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            transition: 'all 0.2s ease-in-out',
                            overflow: 'hidden',
                            '&:hover': {
                                backgroundColor: 'primary.light',
                                pl: 4
                            },
                            '& .hover-icon': {
                                transform: 'translateX(-10px)',
                                opacity: 0,
                                transition: 'all 0.3s ease-in-out',
                            },
                            '&:hover .hover-icon': {
                                transform: 'translateX(0)',
                                opacity: 1,
                                marginX: 1,
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            
                            <Typography sx={{ fontSize: '18px' }}>{label}</Typography>
                            {isMobile ? null : <EastIcon className="hover-icon" />}
                        </Box>
                    </ListItemButton>
                ))}
            </Stack>
        </Box>
    );
}
