import { Box, Container } from "@mui/material";
import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";

const LandingPage = () => {
    return (
        <Box sx={{p:0, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <Header />
            <Main />
            <Footer />
        </Box>
    );
};

export default LandingPage;
