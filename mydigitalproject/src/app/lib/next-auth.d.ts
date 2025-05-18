// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            type: "WORKER" | "COMPANY";
            email: string;
            name?: string | null;
        };
    }
}
