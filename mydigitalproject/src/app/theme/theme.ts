import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        alt: true;
        outline: true;
        outlineAlt: true;
        outlineAltReverse: true;
        danger: true;
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

    typography: {
        h1: {
            color: '#086AA6', 
            fontSize: '52px', 
            fontWeight: "bold"
        },
        h2: {
            color: '#086AA6', 
            fontSize: '36px', 
            fontWeight: "bold"
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
                {
                    props: { variant: "outline" },
                    style: {
                        backgroundColor: "transparent",
                        color: "#3A3A3A",
                        height: "41px",
                        border: "2px solid #3A3A3A",
                        borderRadius: "14px",
                        "&:hover": {
                            border: "2px solid transparent",
                            backgroundColor: "#3229D6",
                            color: "#F9F9F9",
                        }
                    },
                },
                {
                    props: { variant: "outlineAlt" },
                    style: {
                        backgroundColor: "#3229D6",
                        color: "#F9F9F9",
                        height: "41px",
                        borderRadius: "14px",
                    },
                },
                {
                    props: { variant: "outlineAltReverse" },
                    style: {
                        backgroundColor: "#F9F9F9",
                        color: "#3229D6",
                        height: "41px",
                        borderRadius: "14px",
                    },
                },
                {
                    props: { variant: "danger" },
                    style: {
                        backgroundColor: "#c61414",
                        color: "#F9F9F9",
                        height: "41px",
                        borderRadius: "14px",
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
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        boxShadow: "inset 0 4px 4px rgba(0, 0, 0, 0.5)"
                    }
                },

            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    padding: "14px 18px",
                    fontFamily: 'var(--font-montserrat)',
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    padding: "0px",
                }
            }
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
                            border: "2px solid #3A3A3A",
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