'use client';

import {
    Avatar,
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function WorkerProfilePage() {
    const { data: session } = useSession();
    const isMobile = useMediaQuery('(max-width: 780px)');
    const [profile, setProfile] = useState<any>(null);
    const [editMode, setEditMode] = useState(false);
    const [description, setDescription] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [cv, setCv] = useState<File | null>(null);

    useEffect(() => {
        if (session?.user) {
            fetch(`/api/profile/worker`)
                .then((res) => res.json())
                .then((data) => {
                    setProfile(data);
                    setDescription(data.description || '');
                    setCountry(data.country || '');
                });
        }
    }, [session]);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('country', country);
        if (image) formData.append('picture', image);
        if (cv) formData.append('resume', cv);

        await fetch('/api/profile/worker', {
            method: 'POST',
            body: formData,
        });

        setEditMode(false);
    };

    if (!profile) return <Typography>Chargement du profil...</Typography>;

    return (
        <Box sx={{ p: isMobile ? 2 : 6 }}>
            <Typography variant="h2" sx={{ mb: 4 }}>
                Mon profil professionnel
            </Typography>

            <Stack direction="row" spacing={4} alignItems="center">
                <Avatar
                    src={profile.picture || undefined}
                    alt="Photo de profil"
                    sx={{ width: 100, height: 100 }}
                />
                {editMode && (
                    <Button variant="outlined" component="label">
                        Changer photo
                        <input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                    </Button>
                )}
            </Stack>

            <Box sx={{ mt: 4 }}>
                <TextField
                    label="Nom"
                    value={profile.name}
                    fullWidth
                    disabled
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Prénom"
                    value={profile.surname}
                    fullWidth
                    disabled
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Pays"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    fullWidth
                    disabled={!editMode}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    disabled={!editMode}
                    sx={{ mb: 2 }}
                />
                <Typography>
                    CV : {profile.resumeFile ? <a href={profile.resumeFile} target="_blank">Voir le CV</a> : 'Non fourni'}
                </Typography>
                {editMode && (
                    <Button variant="outlined" component="label" sx={{ mt: 1 }}>
                        Charger un CV (PDF)
                        <input type="file" hidden accept="application/pdf" onChange={(e) => setCv(e.target.files?.[0] || null)} />
                    </Button>
                )}
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                {editMode ? (
                    <>
                        <Button variant="contained" onClick={handleSave}>
                            Enregistrer
                        </Button>
                        <Button onClick={() => setEditMode(false)}>Annuler</Button>
                    </>
                ) : (
                    <Button variant="contained" onClick={() => setEditMode(true)}>
                        Modifier mon profil
                    </Button>
                )}
            </Stack>
        </Box>
    );
}
