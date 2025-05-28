// types/next-auth.d.ts

declare module "NextAuth" {
    interface Session {
        user: {
            id: string;
            type: "WORKER" | "COMPANY";
            email: string;
            name?: string | null;
        };
    }
}
