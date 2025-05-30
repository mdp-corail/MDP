// app/api/auth/register/worker/route.ts
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { randomBytes } from "crypto";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name, surname, country } = body;

        // Validation des champs obligatoires
        if (!email || !password || !name || !surname || !country) {
            return NextResponse.json(
                { error: 'Tous les champs sont obligatoires' },
                { status: 400 }
            );
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Adresse email invalide' },
                { status: 400 }
            );
        }

        // Validation du mot de passe
        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Le mot de passe doit contenir au moins 6 caractères' },
                { status: 400 }
            );
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Un compte avec cet email existe déjà' },
                { status: 409 }
            );
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);

        // Générer un token de vérification
        const token = randomBytes(32).toString('hex');

        // Transaction pour créer l'utilisateur et son profil
        const result = await prisma.$transaction(async (tx) => {
            // Créer l'utilisateur
            const newUser = await tx.user.create({
                data: {
                    email: email.toLowerCase(),
                    password: hashedPassword,
                    type: 'WORKER',
                },
            });

            // Créer le profil worker
            const workerProfile = await tx.workerProfile.create({
                data: {
                    name,
                    surname,
                    country,
                    userId: newUser.id,
                    token,
                },
            });

            return { user: newUser, profile: workerProfile };
        });

        console.log('✅ Nouvel utilisateur worker créé:', result.user.email);

        return NextResponse.json(
            {
                message: 'Compte créé avec succès',
                userId: result.user.id,
                profileId: result.profile.id
            },
            { status: 201 }
        );

    } catch (err) {
        console.error('❌ Erreur lors de l\'inscription worker:', err);

        // Gestion d'erreurs spécifiques de Prisma
        if (err instanceof Error) {
            if (err.message.includes('Unique constraint')) {
                return NextResponse.json(
                    { error: 'Un compte avec cet email existe déjà' },
                    { status: 409 }
                );
            }
        }

        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}