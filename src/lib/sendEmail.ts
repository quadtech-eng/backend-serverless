import nodemailer from 'nodemailer'

export const sendEmail = async (email: string, code: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Recuperação de Senha",
        text: `Seu código de recuperação é: ${code}`,
    });
}