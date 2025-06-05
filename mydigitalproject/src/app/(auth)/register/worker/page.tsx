'use client';

import {
    Box,
    Button,
    Divider,
    FormControl,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    Snackbar,
    Alert,
} from '@mui/material';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { SvgIconProps } from '@mui/material';

export default function Register() {
    const isMobile = useMediaQuery('(max-width: 1200px)');
    const [providers, setProviders] = useState<Record<LiteralUnion<string, string>, ClientSafeProvider> | null>(null);
    const router = useRouter();

    const providerIcons: Record<string, (props: SvgIconProps) => JSX.Element> = {
        google: (props) => <GoogleIcon {...props} />,
        linkedin: (props) => <LinkedInIcon {...props} />,
    };

    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        country: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const validateForm = () => {
        if (!form.name || !form.surname || !form.email || !form.country || !form.password || !form.confirmPassword) {
            setError('Tous les champs sont obligatoires.');
            return false;
        }

        if (form.password !== form.confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return false;
        }

        if (form.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError('Veuillez entrer une adresse email valide.');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setError('');
        setLoading(true);

        try {
            const res = await fetch("/api/auth/register/worker", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    surname: form.surname,
                    email: form.email,
                    country: form.country,
                    password: form.password,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/register/success');
                }, 2000);
            } else {
                setError(data.error || 'Erreur lors de la création du compte.');
            }
        } catch (err) {
            console.error('Erreur lors de l\'inscription:', err);
            setError('Erreur serveur. Veuillez réessayer.');
        } finally {
            setLoading(false);
            console.log(success);
        }
    };

    useEffect(() => {
        getProviders().then((providers) => {
            if (providers) {
                const filteredProviders = Object.fromEntries(
                    Object.entries(providers).filter(([key]) => key !== 'credentials')
                );
                setProviders(filteredProviders);
            }
        });
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: isMobile ? 'left' : 'center' }}>
            <Stack direction="column" gap={2} sx={{ mb: 8 }}>
                <Typography variant="h1" sx={{ color: '#086AA6', fontFamily: 'SFPRODISPLAY', fontSize: '52px', fontWeight: 'bold' }}>
                    Créer compte particulier
                </Typography>
                <Typography component="a" href="/register/company" sx={{ textDecoration: 'underline', color: '#086AA6' }}>
                    Ou cliquez ici si vous êtes une entreprise
                </Typography>
            </Stack>

            {providers &&
                Object.values(providers).map((provider) => (
                    <Button
                        disableRipple
                        disableFocusRipple
                        key={provider.id}
                        onClick={() => signIn(provider.id)}
                        startIcon={providerIcons[provider.id]?.({ sx: { fontSize: '32px !important', mr: 4 } })}
                        sx={{ m: 1, width: '340px' }}
                    >
                        Utiliser mon compte {provider.name}
                    </Button>
                ))}

            <Divider sx={{ my: 4, width: isMobile ? '100%' : '80%', backgroundColor: 'primary.light' }} />

            <FormControl sx={{ gap: 2, textAlign: 'left' }}>
                <TextField label="Nom" name="name" value={form.name} onChange={handleChange} size="small" required disabled={loading} />
                <TextField label="Prénom" name="surname" value={form.surname} onChange={handleChange} size="small" required disabled={loading} />
                <TextField label="Pays" name="country" value={form.country} onChange={handleChange} size="small" required disabled={loading} />
                <TextField label="Email" name="email" value={form.email} onChange={handleChange} size="small" required />
                <TextField label="Mot de passe" name="password" type="password" value={form.password} onChange={handleChange} size="small" required disabled={loading} />
                <TextField label="Confirmer le mot de passe" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} size="small" required disabled={loading} />
                <Button disabled={loading} onClick={handleSubmit} variant="alt" sx={{ width: '340px', alignSelf: 'center', mt: 2 }}>
                    Valider
                </Button>
            </FormControl>

            <Typography sx={{ mt: 4 }}>
                Déjà inscrit.e ?{' '}
                <a href="/signin" style={{ textDecoration: 'underline', color: '#086AA6' }}>
                    Se connecter
                </a>
            </Typography>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
}