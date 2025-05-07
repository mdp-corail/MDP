import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        alt: true;
    }
}

declare module '@mui/material/TextField' {
    interface TextFieldPropsVariantOverrides {
        light: true;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#3A3A3A',
            light: '#f9f9f9',
        },
        secondary: {
            main: '#086AA6',
            light: '#3229D6',
        },
    },

    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'var(--font-montserrat)',
                },
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: "alt" },
                    style: {
                        backgroundColor: "#3229D6",
                        color: "#f9f9f9",
                    },
                },
            ],
            styleOverrides: {
                root: {
                    backgroundColor: "#3A3A3A",
                    color: "#f9f9f9",
                    height: "51px",
                    borderRadius: "14px",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "inset 0 4px 4px rgba(0, 0, 0, 0.5)"
                    }
                },

            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        fontFamily: 'var(--font-montserrat-alt)',
                        borderRadius: '14px',
                        p: '2px',
                        height: '51px',
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
                },
            },
        },
    },
});

export default theme;