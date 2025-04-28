'use client';

import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useState, FormEvent, ChangeEvent } from 'react';

const Form: React.FC = () => {
    const isMobile = useMediaQuery("(max-width: 780px)");

    const [email, setEmail] = useState<string>('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        try {
            const response = await fetch('https://api.brevo.com/v3/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': process.env.NEXT_PUBLIC_BREVO_API_KEY!,
                },
                body: JSON.stringify({
                    email: email,
                    listIds: [Number(process.env.NEXT_PUBLIC_BREVO_LIST_ID)],
                    updateEnabled: true,
                }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            setStatus('error');
        }
    };


    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: isMobile ? "40px 30px" : "40px 60px",
                gap: "26px",
                mb: isMobile ? "41px" : "91px"
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: "40px",
                    fontFamily: "SFPRODISPLAYBOLD",
                    fontWeight: "700",
                    textAlign: "center"
                }}
            >
                Rejoignez-nous !
            </Typography>

            <Typography
                sx={{
                    fontSize: "28px",
                    fontFamily: "var(--font-montserrat)",
                    textAlign: "center"
                }}
            >
                <b>Inscrivez-vous</b> dès aujourd{"'"}hui et soyez les premiers à <b>construire un réseau</b> professionnel sans frontières.
            </Typography>

            <TextField
                fullWidth
                placeholder="Votre email"
                variant="outlined"
                size="small"
                value={email}
                onChange={handleEmailChange}
                required
                type="email"
                sx={{
                    width: isMobile ? "333px" : "583px",
                    height: isMobile ? "40px" : "48px",
                    '& .MuiOutlinedInput-root': {
                        fontFamily: 'var(--font-montserrat-alt)',
                        borderRadius: '14px',
                        p: '2px',
                        color: '#086AA6',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        '& fieldset': {
                            borderColor: '#3A3A3A',
                        },
                        '&:hover fieldset': {
                            borderColor: '#3A3A3A',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#086AA6',
                        },
                    },
                    '& input::placeholder': {
                        color: '#3A3A3A',
                        fontFamily: 'var(--font-montserrat-alt)',
                        fontSize: '25px',
                        opacity: 1,
                        fontStyle: 'italic',
                        fontWeight: 'regular',
                    },
                }}
            />

            <Button
                type="submit"
                sx={{
                    backgroundColor: "#3A3A3A",
                    width: "178px",
                    height: "51px",
                    borderRadius: "14px",
                    "&:hover": {
                        boxShadow: "inset 0 4px 4px rgba(0, 0, 0, 0.5)"
                    }
                }}
                disabled={status === 'loading'}
            >
                <Typography
                    sx={{
                        color: "white",
                        textTransform: "uppercase",
                        fontSize: "25px",
                        fontFamily: "SFPRODISPLAY"
                    }}
                >
                    {status === 'loading' ? "Envoi ..." : "s'inscrire"}
                </Typography>
            </Button>

            {status === 'success' && (
                <Typography sx={{ color: "green", fontSize: "20px", mt: 2 }}>
                    Merci pour votre inscription !
                </Typography>
            )}
            {status === 'error' && (
                <Typography sx={{ color: "red", fontSize: "20px", mt: 2 }}>
                    Une erreur est survenue. Veuillez réessayer.
                </Typography>
            )}
        </Box>
    );
};

export default Form;
