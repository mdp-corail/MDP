"use client";

import { Box, Button, IconButton, List, ListItem, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import * as footerLinks from '../../data/footerLinks';


const Footer = () => {
    const isMobile = useMediaQuery("(max-width: 780px)");
    const isTablet = useMediaQuery("(max-width: 1200px)");
    const data = footerLinks;
    return (
        <Box sx={{ p: isMobile ? "40px 30px" : "40px 60px", height: "fit-content", background: "linear-gradient(180deg, #086AA6 0%, #032940 100%)", display: "flex", flexDirection: isTablet ? "column" : "row", width: "100%", justifyContent: "space-between" }}>
            {/* Bloc 1 */}
            <Box sx={{ display: "flex", flexDirection: 'column', width: isTablet ? "100%" : "25%" }}>
                <Box sx={{ width: isTablet ? "100%" : "50%", mb: "41px" }}>
                    <img src="/assets/images/meetwork-white.png" alt="Logo Meetwork" width={269} height={49} />
                </Box>
                {/* Bloc RS */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
                    <Typography sx={{ color: "white", fontSize: "16px", fontFamily: "var(--font-montserrat)", fontWeight: "bold" }}>
                        Réseaux sociaux
                    </Typography>
                    <Stack direction="row" gap={3} sx={{ mt: 2 }}>
                        <IconButton onClick={() => window.open("https://www.tiktok.com/@meetwork?is_from_webapp=1&sender_device=pc", "_blank")} disableRipple disableFocusRipple disableTouchRipple sx={{ p: 0 }}>
                            <FacebookIcon sx={{ color: "white", fontSize: "45px" }} />
                        </IconButton>
                        <IconButton onClick={() => window.open("https://www.instagram.com/_meetwork_/", "_blank")} disableRipple disableFocusRipple disableTouchRipple sx={{ p: 0 }}>
                            <LinkedInIcon sx={{ color: "white", fontSize: "45px" }} />
                        </IconButton>
                        <IconButton disableRipple disableFocusRipple disableTouchRipple sx={{ p: 0 }}>
                            <InstagramIcon sx={{ color: "white", fontSize: "45px" }} />
                        </IconButton>
                    </Stack>
                </Box>
            </Box>
            {/* Bloc 2 */}
            <Box sx={{display: 'flex', flexDirection: isMobile ? "column" : "row", width: isTablet ? "100%" : "75%", justifyContent:'flex-end', gap: isTablet ? 2 : 12, mt: isTablet ? 2 : 0 }}>
                <Box sx={{ display: 'flex', flexDirection: isMobile ? "column" : "row", width: isTablet ? "100%" : "50%", gap: isTablet ? 4 : 12, px: isTablet ? 0 : 2, justifyContent: isTablet ? "flex-start" : "flex-end"  }}>
                    <List>
                        <Typography sx={{ fontWeight: "bold", color: "primary.light", py: 1 }}>
                            Informations
                        </Typography>
                        {data.informations.map((item, index) => (
                            <ListItem key={index} sx={{ color: "white", fontFamily: "var(--font-montserrat)", fontSize: "16px", px: 0, py: 1 }}>
                                <a href={item.url}>{item.title}</a>
                            </ListItem>
                        ))}
                    </List>
                    <List>
                        <Typography sx={{ fontWeight: "bold", color: "primary.light", py: 1 }}>
                            Liens utiles
                        </Typography>
                        {data.usefulLinks.map((item, index) => (
                            <ListItem key={index} sx={{ color: "white", fontFamily: "var(--font-montserrat)", fontSize: "16px", px: 0, py: 1 }}>
                                <a href={item.url}>{item.title}</a>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "column", mt: isMobile ? 2 : 0, p:0}}>
                    <Typography sx={{ fontWeight: "bold", color: "primary.light", py: 1 }}>
                        Recevez notre newsletter !
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Votre email"
                        variant="outlined"
                        size="small"
                        required
                        type="email"
                        sx={{
                            width: "333px",
                            height: "40px",
                            '& .MuiOutlinedInput-root': {
                                fontFamily: 'var(--font-montserrat-alt)',
                                borderRadius: '14px',
                                p: '2px',
                                color: 'primary.light',
                                fontWeight: 'bold',
                                fontStyle: 'italic',
                                '& fieldset': {
                                    borderColor: 'primary.light',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'primary.light',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'secondary.main',
                                },
                            },
                            '& input::placeholder': {
                                color: 'primary.light',
                                fontFamily: 'var(--font-montserrat-alt)',
                                fontSize: '16px',
                                opacity: 1,
                                fontStyle: 'italic',
                                fontWeight: 'regular',
                            },
                        }}
                    />
                    <Button disableRipple disableFocusRipple disableTouchRipple sx={{ mt: 2, width: "333px" }}>S'abonner</Button>
                </Box>
            </Box>
            {isMobile &&
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mt: 4 }}>
                    <IconButton disableRipple disableFocusRipple disableTouchRipple onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} sx={{ width: "fit-content", pb: 0 }}>
                        <ArrowUpwardIcon sx={{ color: "white", fontSize: "25px" }} />
                    </IconButton>
                </Box>
            }
        </Box>
    )
}

export default Footer