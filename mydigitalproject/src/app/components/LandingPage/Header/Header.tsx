import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Header = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "40px 60px"}}>
            <img
                src="/assets/images/logo_noir.png"
                alt="logo"
                width={396}
            />
            <Button sx={{ backgroundColor: "#3A3A3A", width: "178px", height: "51px", borderRadius: "14px", "&:hover": { boxShadow: "inset 0 4px 4px rgba(0, 0, 0, 0.5)"}}}>
                <Typography sx={{ color: "white", textTransform: "uppercase", fontSize: "25px", fontFamily: "SFPRODISPLAY" }}>s'inscrire</Typography>
            </Button>
        </Box>
    );
};

export default Header;
