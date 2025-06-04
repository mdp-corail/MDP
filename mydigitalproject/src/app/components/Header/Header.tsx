/* eslint-disable react/no-unescaped-entities */

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
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import Link from 'next/link';
import { languages } from '@/app/data/languages';
import SearchModal from '../SearchModal/SearchModal';

const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Nos Offres', href: '/plans' },
    { label: 'Annonces', href: '/offers' },
    { label: 'À propos', href: '/about' },
    { label: 'Accessibilité', href: '/accessibility' },
];

const Header = () => {
    const isMobile = useMediaQuery('(max-width: 780px)');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [registerAnchorEl, setRegisterAnchorEl] = useState<null | HTMLElement>(null);
    const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [searchOpen, setSearchOpen] = useState(false);
    const { data: session } = useSession();
    const isLoggedIn = !!session;


    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleUserMenuClose = () => {
        setUserAnchorEl(null);
    };

    const handleRegisterMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setRegisterAnchorEl(event.currentTarget);
    };

    const handleRegisterMenuClose = () => {
        setRegisterAnchorEl(null);
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
                                    ? '/images/meetwork-logo-black.png'
                                    : '/images/meetwork-black.png'
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
                                {isLoggedIn ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={(e) => setUserAnchorEl(e.currentTarget)}
                                        >
                                            <Stack direction="row" gap={0.5} sx={{ alignItems: 'center' }}>
                                                <PersonIcon sx={{ fontSize: '20px !important' }} />
                                                {session?.user?.name}
                                                <ArrowDropDownIcon />
                                            </Stack>
                                        </Button>
                                        <Menu
                                            disableScrollLock
                                            anchorEl={userAnchorEl}
                                            open={Boolean(userAnchorEl)}
                                            onClose={handleUserMenuClose}
                                        >
                                            <MenuItem onClick={handleUserMenuClose}>
                                                <Link href="/profile">Profil</Link>
                                            </MenuItem>
                                            {session?.user?.type === 'COMPANY' && (
                                                <MenuItem onClick={handleUserMenuClose}>
                                                    <Link href="/offers/create">Créer une annonce</Link>
                                                </MenuItem>
                                            )}
                                        </Menu>
                                    </>
                                ) : (
                                    <Button variant="outline" href="/signin">Connexion</Button>
                                )}

                                {isLoggedIn ?
                                    <Button variant="danger" onClick={() => signOut()}>Déconnexion
                                    </Button>
                                    :
                                    <Button variant="outlineAlt" onClick={handleRegisterMenuOpen} endIcon={<ArrowDropDownIcon />}>S'inscrire
                                    </Button>
                                }
                                <Menu
                                    disableScrollLock
                                    anchorEl={registerAnchorEl}
                                    open={Boolean(registerAnchorEl)}
                                    onClose={handleRegisterMenuClose}
                                >
                                    <MenuItem
                                        onClick={() => { handleRegisterMenuClose(); }}>
                                        <Link href="/register/worker">Particulier</Link>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => { handleRegisterMenuClose(); }}>
                                        <Link href="/register/company">Entreprise</Link>
                                    </MenuItem>
                                </Menu>
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
                        <Stack direction="row" gap={2}>
                            <IconButton
                                disableFocusRipple
                                disableRipple
                                disableTouchRipple
                                onClick={handleSearchOpen}
                                sx={{ display: 'flex', alignItems: 'center', pr: 0 }}
                            >
                                <SearchIcon sx={{ fontSize: '25px !important', color: "primary.main" }} />
                            </IconButton>
                            <IconButton disableFocusRipple disableTouchRipple disableRipple onClick={() => setDrawerOpen(true)} sx={{ p: 0 }}>
                                <MenuIcon fontSize="large" sx={{ color: "primary.main" }} />
                            </IconButton>
                        </Stack>
                    )}
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: "100vw", height: "100vh", background: "linear-gradient(180deg, #086AA6 0%, #032940 100%)", p: "40px 30px", color: "primary.light" }}>
                    {/* Languages  */}
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
                                <Typography sx={{ display: 'flex', alignItems: 'center', color: "primary.light" }}>
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

                        <CloseIcon onClick={() => setDrawerOpen(false)} sx={{ cursor: 'pointer', color: "primary.light", alignSelf: "flex-end", p: "8px", fontSize: "51px" }} />
                    </Stack>

                    {/* Main block */}
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center', mt: 8, justifyContent: 'center' }}>
                        <img
                            src={'/images/meetwork-white.png'
                            }
                            alt="Logo Meetwork"
                            width={280}
                            style={{ color: "primary.light" }}
                        />

                        {/* Links list */}
                        <List sx={{ width: "100%", p: 4 }}>
                            {navLinks.map((link) => (
                                <ListItem key={link.label} disablePadding sx={{ width: "100%" }}>
                                    <ListItemButton component={Link} href={link.href} onClick={() => setDrawerOpen(false)} sx={{ textAlign: "center", p: 2 }}>
                                        <ListItemText primary={link.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        {isLoggedIn ? (
                            <>
                                <Button
                                    variant="alt"
                                    onClick={(e) => setUserAnchorEl(e.currentTarget)}
                                    sx={{ width: "185px", mt: 2 }}
                                >
                                    <Stack direction="row" gap={0.5} sx={{ alignItems: 'center' }}>
                                        <PersonIcon sx={{ fontSize: '20px !important' }} />
                                        {session?.user?.name}
                                        <ArrowDropDownIcon />
                                    </Stack>
                                </Button>
                                <Menu
                                    disableScrollLock
                                    anchorEl={userAnchorEl}
                                    open={Boolean(userAnchorEl)}
                                    onClose={handleUserMenuClose}
                                >
                                    <MenuItem onClick={handleMenuClose}>
                                        <Link href="/profile">Profil</Link>
                                    </MenuItem>
                                    {session?.user?.type === 'COMPANY' && (
                                        <MenuItem onClick={handleMenuClose}>
                                            <Link href="/offers/create">+ Créer une annonce</Link>
                                        </MenuItem>
                                    )}
                                </Menu>
                            </>
                        ) : (
                            <Button variant="alt" href="/signin" sx={{ mt: 2, width: "185px" }}>Connexion</Button>
                        )}

                        {isLoggedIn ?
                            <Button variant="danger" onClick={() => signOut()} sx={{ mt: 4, width: "185px" }}>Déconnexion
                            </Button>
                            :
                            <Button variant="outlineAltReverse" onClick={() => setDrawerOpen(false)} href="/register" sx={{ mt: 4, width: "185px" }}>S'inscrire
                            </Button>
                        }
                    </Box>
                </Box>
            </Drawer>

            {/* Search Modal  */}
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
};

export default Header;
