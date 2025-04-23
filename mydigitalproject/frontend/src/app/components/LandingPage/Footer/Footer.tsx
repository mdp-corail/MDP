"use client";

import { Box, Button, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ArrowUpward } from '@mui/icons-material';


/* eslint-disable react/no-unescaped-entities */


const Footer = () => {
    const isMobile = useMediaQuery("(max-width: 740px)");
    return (
        <Box sx={{ p: isMobile ? "40px 30px" : "40px 60px", height: isMobile ? "fit-content" : "181px", background: "linear-gradient(180deg, #086AA6 0%, #032940 100%)", display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
                <Box sx={{ width: isMobile ? "100%" : "25%", mb: isMobile ? "41px" : 0 }}>
                    <img src="/assets/images/logo_blanc.png" alt="logo" width={269} height={49} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "center", width: isMobile ? "100%" : "50%" }}>
                    <Typography sx={{ color: "white", fontSize: "16px", fontFamily: "var(--font-montserrat)", fontWeight: "bold" }}>
                        Suivez-nous sur nos réseaux sociaux
                    </Typography>
                    <Stack direction="row" gap={3} sx={{ mt: 2 }}>
                        <IconButton disableRipple disableFocusRipple disableTouchRipple sx={{ p: 0 }}>
                            <FacebookIcon sx={{ color: "white", fontSize: "45px" }} />
                        </IconButton>
                        <IconButton disableRipple disableFocusRipple disableTouchRipple sx={{ p: 0 }}>
                            <LinkedInIcon sx={{ color: "white", fontSize: "45px" }} />
                        </IconButton>
                        <IconButton disableRipple disableFocusRipple disableTouchRipple sx={{ p: 0 }}>
                            <InstagramIcon sx={{ color: "white", fontSize: "45px" }} />
                        </IconButton>
                    </Stack>
                </Box>
                <Box sx={{ color: "white", fontFamily: "var(--font-montserrat)", width: isMobile ? "100%" : "25%", display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "flex-end", mt: isMobile ? "41px" : 0 }}>
                    <Box sx={{ width: isMobile ? "100%" : "fit-content" }}>
                        <Button component="a"
                            href="mailto:contact@meetwork.com?subject=Demande d'informations"
                            sx={{ width: "100%", backgroundColor: "#3A3A3A", p: "8px 18px", borderRadius: "14px", mb: 2, "&:hover": { boxShadow: "inset 0 4px 4px rgba(0, 0, 0, 0.5)" } }}>
                            <Typography sx={{ color: "white", textTransform: "uppercase", fontSize: "16px", fontFamily: "SFPRODISPLAY" }}>nous contacter</Typography>
                        </Button>
                        <Stack direction="column">
                            <Typography>
                                Site officiel en construction
                            </Typography>
                            <Typography sx={{ fontFamily: "var(--font-montserrat-alt)" }}>
                                © 2025 Meetwork
                            </Typography>
                        </Stack>
                        {isMobile &&
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                <IconButton disableRipple disableFocusRipple disableTouchRipple onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} sx={{ width: "fit-content" }}>
                                    <ArrowUpwardIcon sx={{ color: "white", fontSize: "25px" }} />
                                </IconButton>
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer