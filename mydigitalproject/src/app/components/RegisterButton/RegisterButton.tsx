/* eslint-disable react/no-unescaped-entities */


import { Button } from '@mui/material'
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const RegisterButton = () => {
    return (
        <Button variant="alt" endIcon={<ArrowDropDownIcon />}>
            S'inscrire
        </Button>
    )
}

export default RegisterButton