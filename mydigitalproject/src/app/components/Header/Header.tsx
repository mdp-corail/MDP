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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Link from 'next/link';
import { languages } from '@/app/data/languages';
import SearchModal from '../SearchModal/SearchModal';

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
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [searchOpen, setSearchOpen] = useState(false);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleSearchOpen = () => {
        setSearchOpen(true);
    };

    return (
        <>
            <AppBar
                position="static"
                color="transparent"
                elevation={0}
                sx={{ p: isMobile ? '40px 15px 0px 15px' : '40px 34px 0px 34px' }}
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
                            <Stack direction="row" gap={2} sx={{ alignItems: 'center', ml: 8 }}>
                                <IconButton
                                    disableFocusRipple
                                    disableRipple
                                    disableTouchRipple
                                    onClick={handleSearchOpen}
                                    sx={{ display: 'flex', alignItems: 'center', pr: 0 }}
                                >
                                    <SearchIcon sx={{ fontSize: '25px !important', color: "primary.main" }} />
                                </IconButton>
                                <Button variant="outline" href="/auth/signin">
                                    Connexion
                                </Button>
                                <IconButton
                                    disableFocusRipple
                                    disableRipple
                                    disableTouchRipple
                                    onClick={handleMenuOpen}
                                    sx={{ display: 'flex', alignItems: 'center', pr: 0 }}
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
                            </Stack>
                        </Box>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <IconButton disableFocusRipple disableTouchRipple disableRipple onClick={() => setDrawerOpen(true)} sx={{ p: 0 }}>
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
                            <Stack direction={"row"} gap={1}>
                                <img src={selectedLanguage.icon} alt={`${selectedLanguage.label} flag`} width={24} height={24} style={{ borderRadius: '50%' }} />
                                <Typography>
                                    {selectedLanguage.value.toUpperCase()}
                                </Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            {languages.map(({ label, value, icon }) => (
                                <MenuItem
                                    key={value}
                                    onClick={() => {
                                        setSelectedLanguage({ label, value, icon });
                                        setLangAccordionOpen(false);
                                    }}
                                    sx={{ display: 'flex', gap: 1, alignItems: 'center', backgroundColor: selectedLanguage.value === value ? "primary.light" : "transparent" }}
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

            {/* Search Modal  */}
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
};

export default Header;
