'use client';

import {
    Box, Button, FormControl, Stack, TextField, Typography, Snackbar, Alert, Select, MenuItem, InputLabel, FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const countryOptions = ['FRANCE', 'USA', 'DEUTSCHLAND', 'UK', 'ESPANA', 'ITALIA', 'Other'];
const durationOptions = [
    "Moins d'une semaine",
    '1 à 4 semaines',
    '1 à 3 mois',
    '3 à 6 mois',
    '6 à 12 mois',
];
const sectorOptions = [
    'Développement/Programmation',
    'Web Design',
    'Création Digitale',
    'Marketing',
    'Communication',
];

export default function CreateOfferPage() {
    const [form, setForm] = useState({
        country: '',
        duration: '',
        title: '',
        description: '',
        language: '',
        sector: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name as string]: value }));
        if (error) setError('');
    };

    const handleSubmit = async () => {
        const { title, description, country, duration, language, sector } = form;
        if (!title || !description || !country || !duration || !language || !sector) {
            setError('Tous les champs sont requis.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/offers/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Erreur lors de la création de l\'offre.');
                return;
            }

            setSuccess(true);
            setTimeout(() => router.push('/offers'), 2000);
        } catch (err) {
            console.error('Erreur envoi:', err);
            setError('Erreur serveur. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ mt: 4, mb: 2, color: '#086AA6', textAlign: 'center' }}>
                Créer votre annonce
            </Typography>

            <FormControl sx={{ width: '100%', maxWidth: 500, gap: 2 }}>
                <TextField label="Titre" name="title" value={form.title} onChange={handleChange} size="small" disabled={loading} />

                <FormControl size="small">
                    <InputLabel id="country-label">Pays</InputLabel>
                    <Select
                        labelId="country-label"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        label="Pays"
                        disabled={loading}
                    >
                        {countryOptions.map((country) => (
                            <MenuItem key={country} value={country}>{country}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small">
                    <InputLabel id="duration-label">Durée</InputLabel>
                    <Select
                        labelId="duration-label"
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        label="Durée"
                        disabled={loading}
                    >
                        {durationOptions.map((duration) => (
                            <MenuItem key={duration} value={duration}>{duration}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small">
                    <InputLabel id="language-label">Langue</InputLabel>
                    <Select
                        labelId="language-label"
                        name="language"
                        value={form.language}
                        onChange={handleChange}
                        label="Langue"
                        disabled={loading}
                    >
                        {countryOptions.map((lang) => (
                            <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small">
                    <InputLabel id="sector-label">Secteur d'activité</InputLabel>
                    <Select
                        labelId="sector-label"
                        name="sector"
                        value={form.sector}
                        onChange={handleChange}
                        label="Secteur d'activité"
                        disabled={loading}
                    >
                        {sectorOptions.map((sector) => (
                            <MenuItem key={sector} value={sector}>{sector}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    multiline
                    minRows={4}
                    maxRows={12}
                    size="small"
                    disabled={loading}
                    sx={{ resize: 'none' }}
                />

                <Button variant="contained" onClick={handleSubmit} disabled={loading} sx={{ mt: 2 }}>
                    Valider
                </Button>
            </FormControl>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>

            <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    Annonce créée avec succès !
                </Alert>
            </Snackbar>
        </Box>
    );
}
