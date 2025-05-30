// types/next-auth.d.ts

import NextAuth from 'next-auth'

declare module "NextAuth" {
    interface Session {
        user: {
            id: string;
            type: "WORKER" | "COMPANY";
            email: string;
            name?: string | null;
        };
    }
    interface User {
        type?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        type?: string;
    }
}