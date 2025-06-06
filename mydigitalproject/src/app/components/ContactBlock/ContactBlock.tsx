'use client';

import { Box, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import SouthIcon from '@mui/icons-material/South';

const ContactBlock = () => {
    const isMobile = useMediaQuery("(max-width: 1200px)");
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
                            Contactez-nous
                        </Typography>
                        <IconButton
                            className="icon-button"
                            sx={{
                                left: "50",
                                backgroundColor: "primary.main",
                                width: "80px",
                                height: "80px",
                                p: 2,
                                color: "primary.light",
                                '&:hover': {
                                    backgroundColor: "primary.main",
                                },
                            }}
                        >

                            <Typography sx={{ fontSize: "22px" }}>GO !</Typography>
                        </IconButton>
                    </Stack>
                </a>
            </Stack>
        </Box>
    )
}

export default ContactBlock