'use client';

import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import DummyPlansCards from "./components/DummyCards/DummyPlansCards";
import CarouselPlans from "./components/Carousels/CarouselPlans";
import CarouselAds from "./components/Carousels/CarouselAds";
import DummyAdsCards from "./components/DummyCards/DummyAdsCards";


export default function Page() {
  const isMobile = useMediaQuery("(max-width: 1200px)");
  return (
    <Box>

      {/* Bloc 1 */}
      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", gap: 8, mb: isMobile ? 10 : 20, width: "100%" }}>
        <Stack gap={4} sx={{ width: isMobile ? "100%" : "80%", maxWidth: "695px" }}>
          <Typography variant="h2" sx={{ fontFamily: "SFPRODISPLAY", textAlign: "center" }} >
            Avec Meetwork, <br></br>ouvrez votre horizon professionnel
          </Typography>
          <Typography>
            Explorez une multitude d’opportunités professionnelles à travers le monde. Que vous soyez freelance, étudiant ou professionnel, Meetwork vous connecte à des projets internationaux qui correspondent à vos compétences et envies. Profitez d’échanges culturels enrichissants et développez votre réseau global. Découvrez des missions variées, des collaborations uniques et ouvrez-vous à de nouvelles expériences pour booster votre carrière.
          </Typography>
          <Button disableRipple disableFocusRipple disableTouchRipple sx={{ width: "231px", alignSelf: "center" }}>
            Nous découvrir
          </Button>
        </Stack>
        <Image alt="" src="/images/illustration1.jpg" width={695} height={657} style={{ objectFit: "contain", width: "100%", height: "100%", maxWidth: "695px" }} />
      </Box>

      {/* Bloc 2 */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", mb: isMobile ? 10 : 20 }}>
        <Stack gap={4} sx={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontFamily: "SFPRODISPLAY" }}>
            Découvrez nos offres
          </Typography>
          <Typography>
            Des forfaits adaptés à vos besoins
          </Typography>
        </Stack>
        <Box sx={{ mt: 4 }}>
          {isMobile ?
            <CarouselPlans />
            :
            <Stack direction="row" gap={4}>
              <DummyPlansCards />
            </Stack>
          }
        </Box>
        <Button disableRipple disableFocusRipple disableTouchRipple href="/plans" sx={{ width: "231px", mt: 4 }}>
          VOIR NOS OFFRES
        </Button>
      </Box>

      {/* Bloc 4 */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", mb: isMobile ? 10 : 20 }}>
        <Stack gap={4} sx={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontFamily: "SFPRODISPLAY" }}>
            Parcourez les annonces
          </Typography>
        </Stack>
        <Box sx={{ mt: 4 }}>
          {isMobile ?
            <CarouselAds />
            :
            <Stack direction="row" gap={4}>
              <DummyAdsCards />
            </Stack>
          }
        </Box>
      </Box>
    </Box>
  )
}
