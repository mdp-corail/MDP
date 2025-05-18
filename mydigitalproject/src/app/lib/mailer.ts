import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail', // or use SMTP settings
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (to: string, token: string) => {
    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;

    const mailOptions = {
        from: `"Meetwork" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Confirmez votre compte Meetwork',
        html: `<p>Merci de vous être inscrit.e sur Meetwork ! Cliquez sur le lien ci-dessous pour activer votre compte dès maintenant :</p>
        <a href="${verifyUrl}">Activer mon compte</a>`,
    };

    await transporter.sendMail(mailOptions);
};
