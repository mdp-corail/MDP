import { Box, Card, IconButton, InputAdornment, Modal, Stack, TextField, useMediaQuery } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface SearchModalProps {
    open: boolean
    onClose: () => void
}

const SearchModal = ({ open, onClose }: SearchModalProps) => {
    const isMobile = useMediaQuery("(max-width: 780px)");
    return (
        <Modal open={open} onClose={onClose} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card sx={{ backgroundColor: "primary.light", width: isMobile ? "80%" : "60%", height: "278px", borderRadius: "10px", boxShadow: "none" }}>
                <Box sx={{ height: "100%", p: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <Stack direction={"row"} justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
                        <Box sx={{ alignSelf: "flex-start" }}>
                            <img
                                src={
                                    isMobile
                                        ? '/assets/images/meetwork-logo-black.png'
                                        : '/assets/images/meetwork-black.png'
                                }
                                alt="Logo Meetwork"
                                width={isMobile ? 61 : 250}
                                style={{ color: "primary.main" }}
                            />
                        </Box>
                        <CloseIcon onClick={() => onClose()} sx={{ cursor: 'pointer', color: "primary.main", alignSelf: "flex-start", fontSize: "25px" }} />
                    </Stack>
                    <Stack direction="column" justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            disableFocusRipple
                                            disableRipple
                                            disableTouchRipple
                                        >
                                            <SearchIcon sx={{ color: "primary.main" }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                            placeholder="Rechercher"
                            variant="outlined"
                            size="small"
                            required
                            type="email"
                            sx={{
                                height: "40px",
                                '& .MuiOutlinedInput-root': {
                                    fontFamily: 'var(--font-montserrat-alt)',
                                    borderRadius: '14px',
                                    p: '2px',
                                    color: 'secondary.main',
                                    fontWeight: 'bold',
                                    fontStyle: 'italic',
                                    '& fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'secondary.main',
                                    },
                                },
                                '& input::placeholder': {
                                    color: 'primary.main',
                                    fontFamily: 'var(--font-montserrat-alt)',
                                    fontSize: '16px',
                                    opacity: 1,
                                    fontStyle: 'italic',
                                    fontWeight: 'regular',
                                },
                            }}
                        />
                    </Stack>
                </Box>
            </Card>
        </Modal >
    )
}

export default SearchModal;