
'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function SignIn() {
    const [providers, setProviders] = useState<any>(null);

    useEffect(() => {
        getProviders().then(setProviders);
    }, []);

    return (
        <div>
            <h2>Sign in</h2>
            {providers &&
                Object.values(providers).map((provider: any) => (
                    <button key={provider.id} onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                    </button>
                ))}
        </div>
    );
}
