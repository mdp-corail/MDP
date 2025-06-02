'use client';

import { Box, IconButton } from '@mui/material'
import WestIcon from '@mui/icons-material/West';

const BackButton = () => {
    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
            <IconButton sx={{
                width: "45px",
                height: "45px",
                color: "primary.main",
                p: 0,
                mt: -4
            }}
                disableRipple disableFocusRipple disableTouchRipple onClick={() => window.history.back()}>
                <WestIcon sx={{ fontSize: "45px" }} />
            </IconButton>
        </Box>
    )
}

export default BackButton;