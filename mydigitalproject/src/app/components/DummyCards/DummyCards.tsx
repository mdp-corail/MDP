import { Card, CardContent } from '@mui/material'
import React from 'react'

const DummyCards = () => {
    return (
        <>
            <Card sx={{ backgroundColor: "primary.main", width: "220px", height: "278px", borderRadius: "10px", boxShadow: "none", background: "linear-gradient(180deg, #086AA6 0%, #032940 100%)" }}>
                <CardContent>
                </CardContent>
            </Card>
        </>
    )
}

export default DummyCards