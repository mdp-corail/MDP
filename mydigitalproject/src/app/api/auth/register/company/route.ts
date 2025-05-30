// app/api/auth/register/company/route.ts
import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, country, employeeCount, email, password } = body;

        // Validation des champs obligatoires
        if (!name || !country || !employeeCount || !email || !password) {
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

        // Validation du nombre d'employés
        const employeeCountNum = parseInt(employeeCount, 10);
        if (isNaN(employeeCountNum) || employeeCountNum <= 0) {
            return NextResponse.json(
                { error: 'Le nombre de salariés doit être un nombre positif' },
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
                    type: 'COMPANY',
                },
            });

            // Créer le profil company
            const companyProfile = await tx.companyProfile.create({
                data: {
                    name,
                    country,
                    employeeCount: employeeCountNum,
                    userId: newUser.id,
                    token,
                },
            });

            return { user: newUser, profile: companyProfile };
        });

        console.log('✅ Nouveau compte entreprise créé:', result.user.email);

        return NextResponse.json(
            {
                message: 'Compte entreprise créé avec succès',
                userId: result.user.id,
                profileId: result.profile.id
            },
            { status: 201 }
        );

    } catch (err) {
        console.error('❌ Erreur lors de l\'inscription entreprise:', err);

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