/* eslint-disable react/no-unescaped-entities */

import {
    Button,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    Stack,
    Dialog,
    Box,
    styled,
    Switch,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';

import { languages } from '@/app/data/languages';
import { useState } from 'react';
import accessImages from '@/app/data/accessImages';

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 4,
    '& .MuiSwitch-track': {
        width: "62px",
        height: "29px",
        borderRadius: 28 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '45%',
            transform: 'translateY(-50%)',
            width: 15,
            height: 15,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 10,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 22,
        height: 22,
        margin: -2,
    },
}));


const AccessibilityModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Dialog open={open} onClose={onClose} disableScrollLock>
            <Box sx={{ p: 4, width: "100%" }}>
                <Stack direction="row" gap={"2"} justifyContent={"space-between"}>
                    <IconButton
                        disableFocusRipple
                        disableRipple
                        disableTouchRipple
                        onClick={handleMenuOpen}
                        sx={{ display: 'flex', pr: 0 }}
                    >
                        <Stack direction={'row'} gap={1}>
                            <img src={selectedLanguage.icon} alt={`${selectedLanguage.label} flag`} width={24} height={24} style={{ borderRadius: '50%' }} />
                            <Typography sx={{ display: 'flex', alignItems: 'center', color: "primary.main" }}>
                                {selectedLanguage.value.toUpperCase()}
                                <ArrowDropDownIcon sx={{ fontSize: '25px !important' }} />
                            </Typography>
                        </Stack>
                    </IconButton>
                    <Menu
                        disableScrollLock
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {languages.map(({ label, value, icon }) => (
                            <MenuItem
                                key={value}
                                onClick={() => {
                                    setSelectedLanguage({ label, value, icon });
                                    handleMenuClose();
                                }}
                                sx={{ display: 'flex', gap: 1, justifyContent: 'left', alignItems: 'center', pl: 2, pr: 4, backgroundColor: selectedLanguage.value === value ? "primary.light" : "transparent" }}
                            >
                                <img src={icon} alt={`${label} flag`} width={24} height={24} style={{ borderRadius: '50%' }} />
                                <Typography>{label}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>

                    <IconButton onClick={onClose} disableFocusRipple disableRipple disableTouchRipple>
                        <CloseIcon sx={{ cursor: 'pointer', color: "primary.main", p: "8px", fontSize: "51px" }} />
                    </IconButton>
                </Stack>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <Typography variant='h4' sx={{ textAlign: "center", mt: 2 }}>
                        Paramètres d'accessibilité
                    </Typography>
                    <Button variant="contained" sx={{ width: "231px", mt: 4 }}>Rétablir par défaut</Button>
                    <Typography sx={{ my: 4, fontWeight: "500", textAlign: "left", width: "100%" }}>
                        Sélectionnez les paramètres d'accessibilité selon vos besoins
                    </Typography>
                    <Stack direction="row" gap={2} sx={{ alignItems: "center", width: "100%" }}>
                        <Android12Switch />
                        <Typography sx={{ fontSize: "14px" }}>Profil adapté aux personnes malvoyantes (grossissement des textes, plus d’espacement)</Typography>
                    </Stack>
                    <Stack direction="row" gap={2} sx={{ mt: 2, alignItems: "center", width: "100%" }}>
                        <Android12Switch />
                        <Typography sx={{ fontSize: "14px" }}>Profil adapté aux troubles cognitifs</Typography>
                    </Stack>
                    <Stack direction="row" gap={2} sx={{ mt: 2, alignItems: "center", width: "100%" }}>
                        <Android12Switch />
                        <Stack>
                            <Typography sx={{ fontSize: "14px" }}>Profil adapté aux personnes non voyantes</Typography>
                            <Typography sx={{ fontSize: "14px", fontStyle: "italic" }}>Navigation avec lecteur d’écran, lecture orale des contenues de la page</Typography>
                        </Stack>
                    </Stack>
                    <Box sx={{ textAlign: "left", width: "100%", my: 4 }}>
                        <Typography sx={{ mt: 4, fontWeight: "500" }}>
                            Ajustement du contenu
                        </Typography>
                        <Stack direction="column" gap={2} mt={2} alignItems="center">
                            {accessImages.slice(0, 6).map(({ id, image }) => (
                                <Button
                                    key={id}
                                    disableRipple
                                    disableFocusRipple
                                    disableTouchRipple
                                    sx={{
                                        p: 0,
                                        width: "224px",
                                        height: "118px",
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        bgcolor: "transparent",
                                        '&:hover': {
                                            bgcolor: "transparent",
                                            boxShadow: "none",
                                        },
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`Accessibilité ${id}`}
                                        style={{
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                    <Box sx={{ textAlign: "left", width: "100%", my: 4 }}>
                        <Typography sx={{ mt: 4, fontWeight: "500" }}>
                            Ajustement des couleurs
                        </Typography>
                        <Stack direction="column" gap={2} mt={2} alignItems="center">
                            {accessImages.slice(6, 9).map(({ id, image }) => (
                                <Button
                                    key={id}
                                    disableRipple
                                    disableFocusRipple
                                    disableTouchRipple
                                    sx={{
                                        p: 0,
                                        width: "224px",
                                        height: "118px",
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        bgcolor: "transparent",
                                        '&:hover': {
                                            bgcolor: "transparent",
                                            boxShadow: "none",
                                        },
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`Accessibilité ${id}`}
                                        style={{
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                    <Box sx={{ textAlign: "left", width: "100%", my: 4 }}>
                        <Typography sx={{ mt: 4, fontWeight: "500" }}>
                            Ajustement de l'orientation
                        </Typography>
                        <Stack direction="column" gap={2} mt={2} alignItems="center">
                            {accessImages.slice(9, 11).map(({ id, image }) => (
                                <Button
                                    key={id}
                                    disableRipple
                                    disableFocusRipple
                                    disableTouchRipple
                                    sx={{
                                        p: 0,
                                        width: "224px",
                                        height: "118px",
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        bgcolor: "transparent",
                                        '&:hover': {
                                            bgcolor: "transparent",
                                            boxShadow: "none",
                                        },
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`Accessibilité ${id}`}
                                        style={{
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                    />
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
};

export default AccessibilityModal;
