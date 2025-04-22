import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

/* eslint-disable react/no-unescaped-entities */


const Form = () => {
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: "40px 60px", gap: "26px", mb: "91px"}}>
            <Typography variant="h1" sx={{ fontSize: "40px", fontFamily: "SFPRODISPLAYBOLD", fontWeight: "700" }}>Rejoignez-nous !</Typography>
            <Typography sx={{ fontSize: "28px", fontFamily: "var(--font-montserrat)", textAlign: "center" }}>
                <b>Inscrivez-vous</b> dès aujourd’hui et soyez les premiers à <b>construire un réseau</b> professionnel sans frontières.
            </Typography>
            <TextField
                fullWidth
                placeholder="Votre email"
                variant="outlined"
                size="small"
                sx={{
                    width: "583px", height: "48px",
                    '& .MuiOutlinedInput-root': {
                        fontFamily: 'var(--font-montserrat-alt)',
                        borderRadius: '14px',
                        p: '2px',
                        color: '#086AA6',
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        '& fieldset': {
                            borderColor: '#3A3A3A',
                        },
                        '&:hover fieldset': {
                            borderColor: '#3A3A3A',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#086AA6',
                        },
                    },
                    '& input::placeholder': {
                        color: '#3A3A3A',
                        fontFamily: 'var(--font-montserrat-alt)',
                        fontSize: '25px',
                        opacity: 1,
                        fontStyle: 'italic',
                        fontWeight: 'regular',
                    },
                }}
            />
            <Button sx={{ backgroundColor: "#3A3A3A", width: "178px", height: "51px", borderRadius: "14px", "&:hover": { boxShadow: "inset 0 4px 4px rgba(0, 0, 0, 0.5)" } }}>
                <Typography sx={{ color: "white", textTransform: "uppercase", fontSize: "25px", fontFamily: "SFPRODISPLAY" }}>s'inscrire</Typography>
            </Button>
        </Box>
    )
}

export default Form