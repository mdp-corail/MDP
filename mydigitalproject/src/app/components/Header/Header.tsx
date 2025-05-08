'use client';

import {
    AppBar,
    Box,
    Toolbar,
    Button,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    useMediaQuery,
    Link as MuiLink,
    Stack,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Link from 'next/link';
import { languages } from '@/app/data/languages';

const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
];

const Header = () => {
    const isMobile = useMediaQuery('(max-width: 780px)');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [langAccordionOpen, setLangAccordionOpen] = useState(false);


    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar
                position="static"
                color="transparent"
                elevation={0}
                sx={{ p: isMobile ? '40px 10px 0px 10px' : '40px 34px 0px 34px' }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={
                                isMobile
                                    ? '/assets/images/meetwork-logo-black.png'
                                    : '/assets/images/meetwork-black.png'
                            }
                            alt="Logo Meetwork"
                            width={isMobile ? 61 : 250}
                            style={{ color: "primary.main" }}
                        />
                    </Box>

                    {/* Desktop Nav */}
                    {!isMobile && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 4,
                            }}
                        >
                            <Stack direction={'row'} gap={4}>
                                {navLinks.map((link) => (
                                    <MuiLink
                                        key={link.label}
                                        href={link.href}
                                        component={Link}
                                        underline="none"
                                        sx={{ color: 'text.primary', fontWeight: 500 }}
                                    >
                                        {link.label}
                                    </MuiLink>
                                ))}
                            </Stack>
                            <Stack direction="row" gap={2} sx={{ alignItems: 'center' }}>
                                <Button variant="outline" href="/auth/signin">
                                    Connexion
                                </Button>
                                <IconButton
                                    disableFocusRipple
                                    disableRipple
                                    disableTouchRipple
                                    onClick={handleMenuOpen}
                                    sx={{ display: 'flex', gap: 1, alignItems: 'center', pr: 0 }}
                                >
                                    <LanguageIcon fontSize="medium" />
                                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                        FR
                                        <ArrowDropDownIcon sx={{ fontSize: '25px !important' }} />
                                    </Typography>
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
                                            onClick={handleMenuClose}
                                            sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                                        >
                                            <img src={icon} alt={`${label} flag`} width={24} height={24} style={{ borderRadius: '50%' }} />
                                            <Typography>{label}</Typography>
                                        </MenuItem>
                                    ))}

                                </Menu>
                            </Stack>
                        </Box>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <IconButton disableFocusRipple disableTouchRipple disableRipple onClick={() => setDrawerOpen(true)}>
                            <MenuIcon fontSize="large" sx={{ color: "primary.main" }} />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 250, p: "40px 30px" }}>
                    <CloseIcon onClick={() => setDrawerOpen(false)} sx={{ cursor: 'pointer', color: "primary.main", alignSelf: "flex-end", p: "8px", fontSize: "51px" }} />
                    <List>
                        {navLinks.map((link) => (
                            <ListItem key={link.label} disablePadding>
                                <ListItemButton component={Link} href={link.href} onClick={() => setDrawerOpen(false)}>
                                    <ListItemText primary={link.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ mt: 3 }} />
                    <Accordion
                        elevation={0}
                        expanded={langAccordionOpen}
                        onChange={() => setLangAccordionOpen(!langAccordionOpen)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Typography>Langue</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {languages.map(({ label, value, icon }) => (
                                <MenuItem
                                    key={value}
                                    onClick={() => setLangAccordionOpen(false)}
                                    sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                                >
                                    <img src={icon} alt={`${label} flag`} width={24} height={24} style={{ borderRadius: '50%' }} />
                                    <Typography>{label}</Typography>
                                </MenuItem>
                            ))}

                        </AccordionDetails>
                    </Accordion>
                    <Divider />
                    <Button variant="outlineAlt" href="/auth/signin" onClick={() => setDrawerOpen(false)} sx={{ mt: 4 }}>
                        Connexion
                    </Button>
                </Box>
            </Drawer>
        </>
    );
};

export default Header;
