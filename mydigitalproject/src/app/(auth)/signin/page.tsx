/* eslint-disable react/no-unescaped-entities */

'use client';

import { Box, Button, Checkbox, Divider, FormControl, Stack, SvgIconProps, TextField, Typography, useMediaQuery } from '@mui/material';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { JSX, useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { CheckBox } from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


/**
 * Page de connexion
 *
 * Affiche un formulaire de connexion avec les providers de connexion (Google, LinkedIn, etc.),
 * ainsi qu'un formulaire de connexion par email et mot de passe.
 *
 * Si l'utilisateur n'a pas de compte, il peut cliquer sur le lien "S'inscrire sur Meetwork !"
 * pour acc der  la page d'inscription.
 *
 * @returns Le composant SignIn
 */
export default function SignIn() {
    const isMobile = useMediaQuery("(max-width: 1200px)");
    const [providers, setProviders] = useState<Record<LiteralUnion<string, string>, ClientSafeProvider> | null>(null);
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const providerIcons: Record<string, (props: SvgIconProps) => JSX.Element> = {
        google: (props) => <GoogleIcon {...props} />,
        linkedin: (props) => <LinkedInIcon {...props} />,
    };

    /**
     * Met  jour l' t at du formulaire de connexion en fonction de l' v nement
     * re u de l' l ment HTML.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e - L' v nement re u
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /**
     * Soumet le formulaire de connexion.
     *
     * Envoie une requ te de connexion  l'API NextAuth avec les informations de connexion
     * renseign es dans le formulaire.
     *
     * Si la connexion est valide, redirige vers la page d'accueil.
     *
     * @returns {Promise<void>}
     */
    const handleSubmit = async () => {
        setError('');

        const res = await signIn('credentials', {
            email: form.email,
            password: form.password,
            redirect: false,
        });

        if (res?.ok) {
            window.location.href = '/';
        } else {
            setError('Email ou mot de passe incorrect.');
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
    }, [error]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: isMobile ? "left" : "center" }}>
            <Typography variant="h1" sx={{ color: '#086AA6', fontFamily: "SFPRODISPLAY", fontSize: '52px', fontWeight: "bold", mb: 8 }}>Se connecter ou s'enregistrer</Typography>
            {providers &&
                Object.values(providers).map((provider) => (
                    <Button
                        disableRipple
                        disableFocusRipple
                        key={provider.id}
                        onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                        startIcon={providerIcons[provider.id]?.({ sx: { fontSize: '32px !important', mr: 4 } })}
                        sx={{ m: 1, width: "340px" }}
                    >
                        Se connecter avec {provider.name}
                    </Button>
                ))}
            <Divider sx={{ my: 4, width: isMobile ? "100%" : "80%", backgroundColor: "primary.light" }} />
            <FormControl sx={{ gap: 2, textAlign: "left" }}>
                <Typography>Votre email</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    sx={{ width: isMobile ? "340px" : "583px", mb: 2 }}
                />
                <Typography>Votre mot de passe</Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    required
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
                <Stack direction={"row"} sx={{ alignItems: "center", gap: 1 }}>
                    <Checkbox
                        style={{ padding: 0 }}
                        disableRipple
                        disableFocusRipple
                        icon={<CheckBoxOutlineBlankIcon sx={{ color: 'primary.main', fontSize: '32px !important' }} />}
                        checkedIcon={<CheckBox sx={{ color: 'primary.main', fontSize: '32px !important' }} />}
                    />Se souvenir de moi
                </Stack>
                <Button
                    disableRipple
                    disableFocusRipple
                    variant="alt"
                    onClick={handleSubmit}
                    sx={{ width: "340px", alignSelf: "center", mt: 2 }}>Valider</Button>
            </FormControl>
            <Typography sx={{ mt: 4 }}>
                Vous n'avez pas de compte ? <a href="/register" style={{ textDecoration: "underline", color: "#086AA6" }}>S'inscrire sur Meetwork !</a>
            </Typography>
        </Box>
    );
}
