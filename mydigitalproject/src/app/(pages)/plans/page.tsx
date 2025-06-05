
'use client';

import CarouselPlansDetails from '@/app/components/Carousels/CarouselPlansDetails';
import DummyPlansDetails from '@/app/components/DummyCards/DummyPlansDetails';
import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

const PlansPage = () => {
    const isMobile = useMediaQuery("(max-width: 1600px)");
    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: "40px", textAlign: "center" }}>
                Découvrez nos offres, adaptées à vos besoins
            </Typography>
            <Box sx={{ my: "50px" }}>
                <img src="/images/payments.png" alt="Available payment methods" />
            </Box>
            <Box>
                {isMobile ? <CarouselPlansDetails /> : <DummyPlansDetails />}
            </Box>
        </Box>
    )
}

export default PlansPage;