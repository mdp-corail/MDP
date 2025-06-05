
import { Stack } from '@mui/material'
import React from 'react'

const DummyPlansDetails = () => {
    const cardsData = [
        {
            id: 1,
            image: "/images/adsdetail-freemium.png",
        },
        {
            id: 2,
            image: "/images/adsdetail-premium.png",
        },
        {
            id: 3,
            image: "/images/adsdetail-devis.png",
        }
    ]

    return (
        <Stack direction="row" gap="70px" alignItems="center" justifyContent="center">
            {cardsData.map((card) => (
                <img key={card.id} src={card.image} alt="Détails d'un abonnement" />
            ))}
        </Stack>
    )
}

export default DummyPlansDetails