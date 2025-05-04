'use client';

import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import Form from '../Form/Form'

interface MainProps {
    formRef: React.RefObject<HTMLDivElement | null>;
}


const Main = ({ formRef }: MainProps) => {
    const isMobile = useMediaQuery("(max-width: 780px)");
    const isTablet = useMediaQuery("(max-width: 1200px)");
    return (
        <Box>
            <Box sx={{ display: "flex", flexDirection: isTablet ? "column" : "row", alignItems: isTablet ? "flex-start" : "center", padding: isMobile ? "40px 30px" : "40px 60px", gap: "30px" }}>
                {isTablet ? (<Typography variant="h1" sx={{ color: '#086AA6', fontSize: '52px', fontFamily: "var(--font-montserrat)", fontWeight: "800" }}>Explorer.<br></br>Échanger.<br></br>Connecter.</Typography>) : (
                    <Typography variant="h1" sx={{ color: '#086AA6', fontSize: '52px', fontFamily: "var(--font-montserrat)", fontWeight: "800" }}>Explorer. Échanger. Connecter.</Typography>
                )}
            </Box>
            <Box sx={{ width: "100%", p: isMobile ? "40px 40px" : "40px 60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography sx={{ fontFamily: "SFPRODISPLAY", fontSize: "35px", fontWeight: "bold", textAlign: "center" }}>Avec Meetwork, ouvrez votre horizon professionnel</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: isTablet ? "column" : "row", alignItems: "center", gap: isTablet ? "59px" : "118px", padding: isMobile ? "40px 30px" : "40px 60px", mb: isTablet ? "41px" : "91px" }}>
                <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "20px" }}>
                    Meetwork est une plateforme pour faire des <b>échanges entre professionnels à l{"'"}étranger</b>. Avec nous, explorez de nouveaux horizons, échangez avec d{"'"}autres experts et trouvez la mission parfaite pour votre bagage professionnel. Rejoignez une <b>communauté internationale</b> de passionnés, de freelances et de professionnels en quête de sens, <b>d{"'"}opportunités et d{"'"}expériences uniques</b>. Chaque rencontre est une porte ouverte sur une nouvelle manière de travailler, d{"'"}apprendre et de collaborer au-delà des frontières.<br></br><br></br>
                    Les expériences à l{"'"}étranger sont <b>des opportunités à portée de main</b> pour tous. De plus en plus d{"'"}entreprises recherchent des travailleurs étrangers pour leur donner la possibilité d{"'"}apprendre de nouvelles techniques et méthodes de travail.
                </Typography>
                {isMobile ? null :
                    <Box>
                        <img src="/assets/images/illustration1.jpg" alt="Picture of a welcoming team of workers in an office" width={595} height={408} />
                    </Box>}
            </Box>
            {/* Box dégradée */}
            {isMobile ? (
                <>
                    <Box sx={{ p: "40px 20px", height: "325px", background: "linear-gradient(180deg, #086AA6 0%, #06517F 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", gap: "90px", mb: "41px" }}>
                        {/* premier bloc */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: "591px", p: "20px 20px" }}>
                            <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "52px", fontWeight: "bold", mb: "10px" }}>
                                64 %
                            </Typography>
                            <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "20px", textAlign: "center" }}>
                                des entreprises européennes ont prévu d{"'"}embaucher
                                des travailleurs étrangers en 2022
                                <br></br>
                                (Source : Indeed, 2022)
                            </Typography>
                        </Box>
                    </Box>
                    {/* deuxieme bloc */}
                    <Box sx={{ p: "40px 20px", height: "325px", background: "linear-gradient(180deg, #086AA6 0%, #06517F 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", gap: "90px", mb: "41px" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: "591px", p: "20px 20px" }}>
                            <Box sx={{ display: 'flex', gap: "16px", mb: "10px" }}>
                                <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "52px", fontWeight: "bold" }}>
                                    5.3
                                </Typography>
                                <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "25px", fontWeight: "bold", alignSelf: "flex-end", pb: 1.4 }}>
                                    millions
                                </Typography>
                            </Box>
                            <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "20px", textAlign: "center" }}>
                                de français vivent à l{"'"}étranger, dont une large part
                                pour des raisons professionnelles
                                <br></br>
                                (Source : MEAE, 2023)
                            </Typography>
                        </Box>
                    </Box>
                </>
            ) : (
                <Box sx={{ p: "40px 60px", height: "325px", background: "linear-gradient(180deg, #086AA6 0%, #06517F 100%)", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", color: "white", gap: "90px", mb: isTablet ? "41px" : "91px" }}>
                    {/* premier bloc */}
                    <Box component="blockquote" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: "591px", p: "20px 40px" }}>
                        <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "52px", fontWeight: "bold", mb: "10px" }}>
                            64 %
                        </Typography>
                        <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "20px", textAlign: "center" }}>
                            des entreprises européennes ont prévu d{"'"}embaucher
                            des travailleurs étrangers en 2022
                            <br></br>
                            (Source : Indeed, 2022)
                        </Typography>
                    </Box>
                    {/* deuxieme bloc */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: "591px", p: "20px 40px" }}>
                        <Box component="blockquote" sx={{ display: 'flex', gap: "16px", mb: "10px" }}>
                            <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "52px", fontWeight: "bold" }}>
                                5.3
                            </Typography>
                            <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "25px", fontWeight: "bold", alignSelf: "flex-end", pb: 1.4 }}>
                                millions
                            </Typography>
                        </Box>
                        <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "20px", textAlign: "center" }}>
                            de français vivent à l{"'"}étranger, dont une large part
                            pour des raisons professionnelles
                            <br></br>
                            (Source : MEAE, 2023)
                        </Typography>
                    </Box>
                </Box>
            )
            }
            <Box sx={{ width: "100%", p: isMobile ? "20px 30px" : "20px 60px", display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: "center" }}>
                <Typography sx={{ fontFamily: "SFPRODISPLAY", fontSize: "35px", fontWeight: "bold", textAlign: "center" }}>Mais, que vous propose Meetwork ?</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: isTablet ? "column" : "row", alignItems: "center", gap: isTablet ? "59px" : "118px", padding: isMobile ? "40px 30px" : "40px 60px", mb: isTablet ? "41px" : "91px" }}>
                {isMobile ? null :
                    <Box>
                        <img src="/assets/images/illustration2.jpg" alt="Picture of a team working together in an office" width={595} height={397} />
                    </Box>
                }
                <Typography sx={{ fontFamily: "var(--font-montserrat)", fontSize: "20px" }}>
                    Meetwork est fait pour les entreprises mais également pour les particuliers.
                    <br></br>
                    <br></br>
                    <b>Meetwork entreprises</b> vous propose de poster des annonces d{"'"}emploi ou d{"'"}événements au sein de votre entreprise et d{"'"}y trouver des personnes intéressées à l{"'"}international. Nous vous proposerons des profils adaptés à votre demande mais vous serez libre de trouver vos profils idéaux.
                    <br></br>
                    <br></br>
                    <b>Meetwork particuliers</b> vous propose différentes annonces d{"'"}entreprises recherchant des collaborateurs pour une certaine durée dans leur entreprise ou bien des événements.
                    <br></br>
                    <br></br>
                    Vous pourrez créer votre profil avec :
                    <br></br>
                    • Votre CV
                    <br></br>
                    • Vos centres d{"'"}intérêts
                    <br></br>
                    • Vos langues parlées
                    <br></br>
                    et bien d{"'"}autres critères.
                    <br></br>
                    <br></br>
                    <b>Avec Meetwork, saisissez plus que des opportunités : explorez, échangez, et surtout connectez-vous aux autres !</b>
                </Typography>
            </Box>
            <div ref={formRef}>
                <Form />
            </div>
        </Box >
    )
}

export default Main