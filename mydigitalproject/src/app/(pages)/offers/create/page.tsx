/* eslint-disable react/no-unescaped-entities */

'use client';

import {
    Box, Button, FormControl, TextField, Typography, Snackbar, Alert, Select, MenuItem, InputLabel, Slider,
    Input
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SelectChangeEvent } from '@mui/material/Select';
import BackButton from '@/app/components/BackButton/BackButton';

const durationOptions = [
    "Moins d'une semaine",
    '1 à 4 semaines',
    '1 à 3 mois',
    '3 à 6 mois',
    '6 à 12 mois',
];
const countryOptions = ['FRANCE', 'USA', 'DEUTSCHLAND', 'UK', 'ESPANA', 'ITALIA', 'Other'];

const sectorOptions = [
    'DEVELOPPEMENT_PROGRAMMATION',
    'WEB_DESIGN',
    'CREATION_DIGITALE',
    'MARKETING',
    'COMMUNICATION',
];

const sectorLabels: Record<string, string> = {
    DEVELOPPEMENT_PROGRAMMATION: 'Développement/Programmation',
    WEB_DESIGN: 'Web Design',
    CREATION_DIGITALE: 'Création Digitale',
    MARKETING: 'Marketing',
    COMMUNICATION: 'Communication',
};

export default function CreateOfferPage() {
    const [form, setForm] = useState({
        country: '',
        duration: '',
        title: '',
        description: '',
        language: '',
        sector: '',
        people: 1,
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
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
            <BackButton />
            <Typography variant="h2" sx={{ mt: 4, mb: 2, color: '#086AA6', textAlign: 'center' }}>
                Créer votre annonce
            </Typography>
            <FormControl sx={{ width: '100%', maxWidth: 500, gap: 2 }}>
                <FormControl size="small">
                    <InputLabel id="country-label">Pays</InputLabel>
                    <Select
                        labelId="country-label"
                        name="country"
                        value={form.country}
                        onChange={handleSelectChange}
                        label="Pays"
                        disabled={loading}
                        sx={{}}
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
                        onChange={handleSelectChange}
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
                        onChange={handleSelectChange}
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
                        onChange={handleSelectChange}
                        label="Secteur d'activité"
                        disabled={loading}
                    >
                        {sectorOptions.map((value) => (
                            <MenuItem key={value} value={value}>
                                {sectorLabels[value]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <Typography gutterBottom>Nombre de personnes concernées</Typography>
                    <Slider
                        name="people"
                        value={form.people}
                        onChange={(e, value) => {
                            setForm((prev) => ({ ...prev, people: value as number }));
                        }}
                        min={1}
                        max={100}
                        step={1}
                        valueLabelDisplay="auto"
                        disabled={loading}
                        sx={{ color: 'secondary.light' }}
                    />
                </FormControl>

                <TextField label="Titre" name="title" value={form.title} onChange={handleInputChange} size="small" disabled={loading} />
                <Input
                    placeholder="Description"
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    multiline
                    minRows={4}
                    maxRows={12}
                    size="small"
                    disabled={loading}
                    sx={{ p: 2, border: '2px solid #3A3A3A', borderRadius: 2 }}
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
