import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'

const DummyCards = () => {
    const cardsData = [
        {
            id: 1,
            title: "Freemium",
            description: "0€/mois",
        },
        {
            id: 2,
            title: "Premium",
            description: "26.99€/mois",
        },
        {
            id: 3,
            title: "Entreprise",
            description: "Sur devis",
        },
    ]

    return (
        <>
            {cardsData.map((card) => (
                <Card key={card.id} sx={{ width: "220px", height: "279px", borderRadius: "10px", boxShadow: "none", background: "linear-gradient(180deg, #086AA6 0%, #032940 100%)" }}>
                    <CardContent sx={{ height: "100%", color: "primary.light", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Stack direction="column" gap={"70px"} sx={{ alignItems: "center", justifyContent: "center" }}>
                            <Typography variant="h4" sx={{ fontSize: "28px" }}>{card.title}</Typography>
                            <Typography variant="h3" sx={{ fontSize: "30px" }}>{card.description}</Typography>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}

export default DummyCards