'use client';

import { Box, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import EastIcon from '@mui/icons-material/East';
import SouthIcon from '@mui/icons-material/South';

const ContactBlock = () => {
    const isMobile = useMediaQuery("(max-width: 780px)");
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", borderTop: "1px solid #3A3A3A", p: isMobile ? "40px 30px" : "40px 60px", gap: 2, textAlign: isMobile ? "center" : "left" }}>
            <Stack sx={{ alignItems: isMobile ? "center" : "flex-start"}}>
                <Typography sx={{ fontSize: "22px"}}>
                    Des questions ?
                </Typography>
                {isMobile ?
                    <SouthIcon /> : null}
                <a href="/contact">
                    <Stack
                        direction={isMobile ? "column" : "row"}
                        gap={2}
                        sx={{
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover .icon-button": {
                                opacity: 1,
                                transform: "translateX(0)",
                            },
                        }}
                    >
                        <Typography variant="h3" sx={{ color: "primary.main" }}>
                            Contactez-nous !
                        </Typography>
                        <IconButton
                            className="icon-button"
                            sx={{
                                left: isMobile ? "50" : "0",
                                backgroundColor: "primary.main",
                                width: isMobile ? "80px" : "60px",
                                height: isMobile ? "80px" : "60px",
                                p: 2,
                                color: "primary.light",
                                opacity: isMobile ? 1 : 0,
                                transform: isMobile ? "translateX(0)" : "translateX(-20px)",
                                transition: "all 0.2s ease",
                                '&:hover': {
                                    backgroundColor: "primary.main",
                                },
                            }}
                        >

                            {isMobile ? <Typography sx={{ fontSize: "22px" }}>GO !</Typography> : <EastIcon />}
                        </IconButton>
                    </Stack>
                </a>
            </Stack>
        </Box>
    )
}

export default ContactBlock