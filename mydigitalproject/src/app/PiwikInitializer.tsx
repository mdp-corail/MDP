'use client';

import { useEffect } from 'react';
import PiwikPro from '@piwikpro/react-piwik-pro';

const PiwikInitializer = () => {
    useEffect(() => {
        PiwikPro.initialize(
            '78e4b54b-5e1d-438a-a75e-fedcf789b48c',
            'https://meetwork.containers.piwik.pro'
        );
    }, []);

    return null;
};

export default PiwikInitializer;
