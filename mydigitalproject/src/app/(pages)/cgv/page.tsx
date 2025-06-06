
import { Box, Typography } from '@mui/material'
import React from 'react'

const page = () => {
    return (
        <Box>
            <Typography variant="h2">
                Conditions Générales d’Utilisation (CGU)
            </Typography>
            <br></br>
            <Typography>
                Dernière mise à jour : 05/06/2025
                <br></br>
                Bienvenue sur Meetwork, une plateforme dédiée à la mise en relation entre professionnels et entreprises à travers la publication et la réponse à des offres d’emploi ou de missions.
                <br></br>
                En accédant à notre site internet ou à notre application, vous acceptez pleinement et entièrement les présentes Conditions Générales d’Utilisation (ci-après les « CGU »). Si vous n’acceptez pas ces CGU, veuillez ne pas utiliser notre service.
                <br></br>
                <br></br>
                1. Informations légales
                <br></br>
                Éditeur du site : MEETWORK
                <br></br>
                Responsable de publication : Adrien Verwaerde
                <br></br>
                Hébergement : Railway
                <br></br>
                Contact : contact@meetwork.pro
                <br></br>
                <br></br>
                2. Objet du service
                <br></br>
                Meetwork est une plateforme en ligne qui permet :
                <br></br>
                Aux entreprises de créer un compte, publier des offres, et gérer les candidatures.
                <br></br>
                Aux particuliers (candidats) de créer un profil, rechercher des offres, postuler, et gérer leurs candidatures.
                <br></br>
                <br></br>
                3. Conditions d’inscription
                <br></br>
                L’utilisateur s’engage à fournir des informations exactes, complètes et à jour.
                <br></br>
                Il est interdit de créer un compte usurpant l’identité d’un tiers.
                <br></br>
                L’accès à certaines fonctionnalités nécessite une authentification par email ou via Google/LinkedIn (via NextAuth).
                <br></br>
                <br></br>
                4. Comportement attendu des utilisateurs
                <br></br>
                Les utilisateurs s’engagent à :
                <br></br>
                Ne pas publier de contenu illégal, diffamatoire, injurieux, haineux ou discriminatoire.
                <br></br>
                Respecter la confidentialité des informations échangées via la plateforme.
                <br></br>
                Utiliser la plateforme uniquement dans le cadre légal d’une recherche ou publication d’offre professionnelle.
                <br></br>
                <br></br>
                5. Propriété intellectuelle
                <br></br>
                Le contenu du site (logos, textes, images, code) est protégé par les droits de propriété intellectuelle et appartient à Meetwork ou ses partenaires.
                <br></br>
                Toute reproduction, distribution ou exploitation sans autorisation est strictement interdite.
                <br></br>
                <br></br>
                6. Responsabilités
                <br></br>
                Meetwork met tout en œuvre pour assurer un service sécurisé et fonctionnel, mais ne peut être tenu responsable des interruptions, erreurs ou pertes de données liées à des événements hors de son contrôle (ex. : pannes serveur, force majeure).
                <br></br>
                Meetwork ne garantit pas l’aboutissement d’une candidature ou le sérieux des offres publiées.
                <br></br>
                <br></br>
                7. Données personnelles
                <br></br>
                Les données personnelles collectées sont traitées conformément à la Politique de Confidentialité (voir section dédiée).
                <br></br>
                Vous pouvez à tout moment demander la suppression de vos données en nous contactant à [contact@meetwork.pro].
                <br></br>
                <br></br>
                8. Sécurité
                <br></br>
                Le site utilise des pratiques de sécurité telles que :
                <br></br>
                Authentification sécurisée via NextAuth (avec support Google/LinkedIn)
                <br></br>
                Hachage des mots de passe avec bcrypt
                <br></br>
                Vérification des fichiers uploadés (formats .pdf, .png, .jpg uniquement)
                <br></br>
                Utilisation d’ORM sécurisé (Prisma) pour éviter toute injection SQL
                <br></br>
                <br></br>
                9. Résiliation de compte
                <br></br>
                L’utilisateur peut à tout moment demander la suppression de son compte. Meetwork se réserve également le droit de suspendre ou supprimer un compte en cas de non-respect des CGU.
                <br></br>
                <br></br>
                10. Modifications des CGU
                <br></br>
                Meetwork se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés via le site ou par email.
                <br></br>
                <br></br>
                11. Droit applicable
                <br></br>
                Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux compétents seront ceux du ressort du siège social de Meetwork.
            </Typography>
        </Box>
    )
}

export default page