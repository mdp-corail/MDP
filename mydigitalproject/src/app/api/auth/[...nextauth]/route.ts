import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Mot de passe', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { worker: true, company: true },
                });

                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                return { id: user.id, email: user.email, type: user.type };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async signIn({ user, account }) {
            const existingUser = await prisma.user.findUnique({
                where: { email: user.email! },
            });

            // If user doesn't exist yet, create it
            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        email: user.email!,
                        password: '',
                        type: 'WORKER',
                        worker: {
                            create: {
                                name: user.name?.split(' ')[0] ?? 'Nom',
                                surname: user.name?.split(' ')[1] ?? 'Prénom',
                                country: 'Non spécifié',
                            },
                        },
                    },
                });
            }

            return true;
        },

        async session({ session, token }) {
            const dbUser = await prisma.user.findUnique({
                where: { email: session.user?.email! },
                select: { id: true, type: true },
            });

            if (dbUser) {
                session.user.id = dbUser.id;
                session.user.type = dbUser.type;
            }

            return session;
        },
    },
});

export { handler as GET, handler as POST };