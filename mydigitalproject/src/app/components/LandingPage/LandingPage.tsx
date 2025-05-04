'use client';

import { Box } from "@mui/material";
import React, { useRef } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";

const LandingPage = () => {
    const formRef = useRef<HTMLDivElement>(null);
    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Box sx={{ p: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Header onScrollToForm={scrollToForm} />
            <Main formRef={formRef} />
            <Footer />
        </Box>
    );
};

export default LandingPage;
