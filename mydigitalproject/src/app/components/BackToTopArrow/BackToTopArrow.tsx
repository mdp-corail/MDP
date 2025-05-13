'use client';

import { Box, IconButton } from '@mui/material'
import NorthIcon from '@mui/icons-material/North';

const BackToTopArrow = () => {
    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", p: 2 }}>
            <IconButton sx={{
                backgroundColor: "primary.main",
                width: "60px",
                height: "60px",
                p: 2,
                color: "primary.light",
            }}
            disableRipple disableFocusRipple disableTouchRipple onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <NorthIcon />
            </IconButton>
        </Box>
    )
}

export default BackToTopArrow;