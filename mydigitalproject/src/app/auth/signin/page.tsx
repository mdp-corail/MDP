'use client';

import { Box, Button, Checkbox, Divider, FormControl, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { getProviders, signIn } from 'next-auth/react';
import { JSX, useEffect, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { CheckBox } from '@mui/icons-material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ContactBlock from '@/app/components/ContactBlock/ContactBlock';


export default function SignIn() {
    const isMobile = useMediaQuery("(max-width: 780px)");
    const [providers, setProviders] = useState<any>(null);
    const providerIcons: Record<string, (props?: any) => JSX.Element> = {
        google: (props) => <GoogleIcon {...props} />,
        linkedin: (props) => <LinkedInIcon {...props} />,
    };

    useEffect(() => {
        getProviders().then(setProviders);
    }, []);

    return (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: isMobile ? "left" : "center"}}>
                <Typography variant="h1" sx={{ color: '#086AA6', fontFamily: "SFPRODISPLAY", fontSize: '52px', fontWeight: "bold", mb: 8 }}>Se connecter ou s'enregistrer</Typography>
                {providers &&
                    Object.values(providers).map((provider: any) => (
                        <Button
                            disableRipple
                            disableFocusRipple
                            key={provider.id}
                            onClick={() => signIn(provider.id)}
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
                        sx={{ width: isMobile ? "340px" : "583px", mb: 2 }}
                    />
                    <Typography>Votre mot de passe</Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        required
                        type="password"
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
                        variant="alt" sx={{ width: "340px", alignSelf: "center", mt: 2 }}>Valider</Button>
                </FormControl>
                <Typography sx={{ mt: 4 }}>
                    Vous n'avez pas de compte ? <a href="/auth/register" style={{ textDecoration: "underline", color: "#086AA6" }}>S'inscrire sur Meetwork !</a>
                </Typography>
            </Box>
    );
}
