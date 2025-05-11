'use client';

import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import DummyCards from "./components/DummyCards/DummyCards";
import { Carousel } from "@/components/ui/carousel";


export default function Page() {
  const isMobile = useMediaQuery("(max-width: 780px)");
  return (
    <Box>

      {/* Bloc 1 */}
      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", gap: 8, mb: isMobile ? 10 : 20, width: "100%" }}>
        <Stack gap={4} sx={{ width: isMobile ? "100%" : "80%", maxWidth: "695px" }}>
          <Typography variant="h2" sx={{ fontFamily: "SFPRODISPLAY" }} >
            Title
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac ante ut mauris faucibus posuere. Suspendisse bibendum id tellus id tempor. Mauris euismod finibus velit ut vestibulum. Pellentesque purus metus, dapibus sed diam ac, varius porttitor erat. Cras at magna sit amet magna sollicitudin sodales at in lacus
          </Typography>
          <Button disableRipple disableFocusRipple disableTouchRipple sx={{ width: "231px", alignSelf: "center" }}>
            CTA BUTTON
          </Button>
        </Stack>
        <Image alt="" src="/assets/images/placeholder.jpg" width={695} height={657} style={{ objectFit: "contain", width: "100%", height: "100%", maxWidth: "695px" }} />
      </Box>

      {/* Bloc 2 */}
      <Box sx={{ mb: isMobile ? 10 : 20, width: "100%" }}>
        <Stack gap={4} sx={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontFamily: "SFPRODISPLAY" }}>
            Lorem ipsum dolor sit amet consectetur
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur
          </Typography>
        </Stack>
        <Stack direction="row" gap={4} sx={{ mt: 4 }}>
          <Image alt="" src="/assets/images/placeholder.jpg" width={308} height={254} style={{ objectFit: "contain", width: "100%", height: "100%", borderRadius: "10px" }} />
          <Image alt="" src="/assets/images/placeholder.jpg" width={308} height={254} style={{ objectFit: "contain", width: "100%", height: "100%", borderRadius: "10px" }} />
          <Image alt="" src="/assets/images/placeholder.jpg" width={308} height={254} style={{ objectFit: "contain", width: "100%", height: "100%", borderRadius: "10px" }} />
        </Stack>
      </Box>

      {/* Bloc 3 */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", mb: isMobile ? 10 : 20 }}>
        <Stack gap={4} sx={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontFamily: "SFPRODISPLAY" }}>
            Lorem ipsum dolor sit amet consectetur
          </Typography>
        </Stack>
        <Stack direction="row" gap={4} sx={{ flexWrap: "wrap", justifyContent: "center", mt: 4 }}>
          <DummyCards />
        </Stack>
        <Button disableRipple disableFocusRipple disableTouchRipple sx={{ width: "231px", mt: 4 }}>
          CTA BUTTON
        </Button>
      </Box>

      {/* Bloc 4 */}
      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", gap: 8, mb: isMobile ? 10 : 20, width: "100%" }}>
        <Image alt="" src="/assets/images/placeholder.jpg" width={472} height={389} style={{ objectFit: "contain", width: "100%", height: "100%", maxWidth: "472px" }} />
        <Stack gap={4} sx={{ width: isMobile ? "100%" : "80%", maxWidth: "695px" }}>
          <Typography variant="h2" sx={{ fontFamily: "SFPRODISPLAY" }} >
            Title
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac ante ut mauris faucibus posuere. Suspendisse bibendum id tellus id tempor. Mauris euismod finibus velit ut vestibulum. Pellentesque purus metus, dapibus sed diam ac, varius porttitor erat. Cras at magna sit amet magna sollicitudin sodales at in lacus
          </Typography>
          <Button disableRipple disableFocusRipple disableTouchRipple sx={{ width: "231px", alignSelf: "center" }}>
            CTA BUTTON
          </Button>
        </Stack>
      </Box>

      {/* Bloc 5 */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", mb: 10 }}>
        <Stack gap={4} sx={{ textAlign: "center" }}>
          <Typography variant="h2" sx={{ fontFamily: "SFPRODISPLAY" }}>
            Lorem ipsum dolor sit amet consectetur
          </Typography>
        </Stack>
        <Stack direction="row" gap={4} sx={{ flexWrap: "wrap", justifyContent: "center", mt: 4 }}>
          <DummyCards />
        </Stack>
        <Button disableRipple disableFocusRipple disableTouchRipple sx={{ width: "231px", mt: 4 }}>
          CTA BUTTON
        </Button>
      </Box>
    </Box>
  )
}
