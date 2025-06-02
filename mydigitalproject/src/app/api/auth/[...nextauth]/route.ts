
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
// import LinkedInProvider from 'next-auth/providers/linkedin';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

declare module "next-auth" {
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

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // LinkedInProvider({
        //     clientId: process.env.LINKEDIN_CLIENT_ID!,
        //     clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
        // }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Mot de passe', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.log('Credentials manquantes');
                        return null;
                    }

                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                        include: { worker: true, company: true },
                    });

                    if (!user || !user.password) {
                        console.log('Utilisateur non trouvé ou pas de mot de passe');
                        return null;
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isValid) {
                        console.log('Mot de passe invalide');
                        return null;
                    }

                    console.log('Authentification réussie pour:', user.email);
                    return {
                        id: user.id.toString(), // S'assurer que l'ID est une string
                        email: user.email,
                        type: user.type
                    };
                } catch (error) {
                    console.error('Erreur lors de l\'authentification:', error);
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/signin',
        error: '/signin', // Rediriger les erreurs vers la page de connexion
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.type = user.type;
            }
            return token;
        },
        async session({ session }) {
            try {
                if (!session.user?.email) return session;

                const user = await prisma.user.findUnique({
                    where: { email: session.user.email },
                    include: {
                        worker: true,
                        company: true,
                    },
                });

                if (user) {
                    // Ajouter l'ID utilisateur à la session
                    session.user.id = user.id.toString();

                    if (user.type === 'WORKER' && user.worker) {
                        session.user.name = user.worker.surname;
                    } else if (user.type === 'COMPANY' && user.company) {
                        session.user.name = user.company.name;
                    }

                    // Ajouter le type d'utilisateur à la session
                    session.user.type = user.type;
                }

                return session;
            } catch (error) {
                console.error('Erreur dans le callback session:', error);
                return session;
            }
        },
    },
    debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };