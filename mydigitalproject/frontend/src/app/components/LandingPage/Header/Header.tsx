'use client';

import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";

/* eslint-disable react/no-unescaped-entities */


const Header = () => {

    const isMobile = useMediaQuery("(max-width: 780px)");
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: isMobile ? "40px 30px" : "40px 60px" }}>
            {isMobile ? <img src="/assets/images/PICTO_NOIR.png" alt="logo" width={81} height={68} /> :
                <img
                    src="/assets/images/logo_noir.png"
                    alt="logo"
                    width={396}
                    height={72}
                />
            }
            <Button sx={{ backgroundColor: "#3A3A3A", width: "178px", height: "51px", ml:"auto", borderRadius: "14px", "&:hover": { boxShadow: "inset 0 4px 4px rgba(0, 0, 0, 0.5)" } }}>
                <Typography sx={{ color: "white", textTransform: "uppercase", fontSize: "25px", fontFamily: "SFPRODISPLAY" }}>s'inscrire</Typography>
            </Button>
        </Box>
    );
};

export default Header;
