/* eslint-disable react/no-unescaped-entities */

import { Card, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'


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

const OffersFilters = () => {
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
    const [loading, setLoading] = useState(false);

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setLoading(true);
        if (error) setError('');
    };

    return (
        <Card sx={{ width: "100%", p: 2, boxShadow: "none", border: "2px solid #3A3A3A" }}>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="country-label">Localisation</InputLabel>
                <Select
                    labelId="country-label"
                    name="country"
                    value={form.country}
                    onChange={handleSelectChange}
                    label="Durée"
                    disabled={loading}
                >
                    {countryOptions.map((country) => (
                        <MenuItem key={country} value={country}>{country}</MenuItem>
                    ))}
                </Select>
            </FormControl >
            <Divider sx={{ my: 2, borderColor: "primary.main" }} />
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="duration-label">Durée de la mission</InputLabel>
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
            </FormControl >
            <Divider sx={{ my: 2, borderColor: "primary.main" }} />
            <FormControl sx={{ width: "100%" }}>
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
            <Divider sx={{ my: 2, borderColor: "primary.main" }} />
            <FormControl sx={{ width: "100%" }}>
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
        </Card>
    )
}

export default OffersFilters