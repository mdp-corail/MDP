'use client';

import {
    Box,
    Button,
    Divider,
    FormControl,
    TextField,
    Typography,
    useMediaQuery,
    Snackbar,
    Alert,
    Stack,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/app/components/BackButton/BackButton';
import PersonIcon from '@mui/icons-material/Person';


export default function Apply() {
    const isMobile = useMediaQuery('(max-width: 780px)');
    const router = useRouter();
    const [cvFile, setCvFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];
        const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];

        if (!validTypes.includes(file.type)) {
            setError('Seuls les fichiers PDF, PNG ou JPG sont acceptés.');
            return;
        }

        setCvFile(file);
        setError('');
    };

    const handleFileUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/applications/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data.filePath;
    };


    const handleSubmit = async () => {
        if (!form.name || !form.surname || !form.email || !cvFile) {
            setError('Tous les champs sont obligatoires.');
            return;
        }

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('surname', form.surname);
        formData.append('email', form.email);
        formData.append('phone', form.phone || '');
        formData.append('cv', cvFile);

        setLoading(true);
        try {
            const res = await fetch('/api/apply', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Erreur lors de la soumission.');
            } else {
                setSuccess(true);
                setTimeout(() => router.push('/offers'), 2000);
            }
        } catch (err) {
            console.error('Erreur:', err);
            setError('Erreur serveur.');
        } finally {
            setLoading(false);
        }
    };

    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        resume: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    return (
        <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: isMobile ? 'left' : 'center' }}>
            <BackButton />
            <Typography variant="h1" mt={2} sx={{ color: 'primary.main', fontFamily: 'SFPRODISPLAY', fontSize: '40px', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
                Rejoignez cette aventure
            </Typography>
            <Button
                disableRipple
                disableFocusRipple
                disableTouchRipple
                startIcon={<PersonIcon sx={{ fontSize: '32px !important', mr: 4 }} />}
                sx={{ m: 1, width: "340px" }}
            >
                Postuler avec mon profil
            </Button>
            <Divider sx={{ my: 4, width: isMobile ? '100%' : '80%', backgroundColor: 'primary.main' }} />
            <FormControl sx={{ gap: 2, textAlign: 'left' }}>
                <TextField label="Nom" name="name" value={form.name} onChange={handleChange} size="small" required disabled={loading} />
                <TextField label="Prénom" name="surname" value={form.surname} onChange={handleChange} size="small" required disabled={loading} />
                <TextField label="Email" name="email" value={form.email} onChange={handleChange} size="small" required />
                <TextField label="Numéro de téléphone" name="phone" value={form.phone} onChange={handleChange} size="small" required />
                <Stack>
                    <Typography>Votre CV</Typography>
                    <Typography sx={{ fontStyle: 'italic' }}>
                        {cvFile?.name || 'nomdufichier.extension'}
                    </Typography>
                    <Button variant="alt" sx={{ mt: 2, width: "340px" }} component="label">
                        Choisir un fichier (.png .jpg .pdf)
                        <input type="file" accept=".png,.jpg,.jpeg,.pdf" hidden onChange={handleFileChange} />
                    </Button>
                </Stack>

                <Button disabled={loading} onClick={handleSubmit} sx={{ width: '231px', alignSelf: 'center', mt: 2 }}>
                    Postuler
                </Button>
            </FormControl>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert severity="error" onClose={() => setError('')}>
                    {error}
                </Alert>
            </Snackbar>

            <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    Candidature envoyée avec succès !
                </Alert>
            </Snackbar>
        </Box>
    );
}
