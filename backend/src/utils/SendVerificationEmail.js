import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "./proccessPass.js";
import Verification from "../models/emailVerification.js";
import PasswordReset from "../models/PasswordReset.js";

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

export const sendVerificationEmail = async (user, res) => {
  const { _id, email, firstName, lastName } = user;

  const token = _id + uuidv4();

  const link = APP_URL + "/users/verify/" + _id + "/" + token;

  //mail options
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">¡Hola ${firstName} ${lastName}, bienvenido a nuestra aplicación!</h2>
      <p style="color: #555;">Estás a un paso de completar tu registro. Haz clic en el enlace de abajo para verificar tu correo electrónico:</p>
      <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Verificar mi correo electrónico</a>
      <p style="color: #555; margin-top: 20px;">Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:</p>
      <p style="color: #007BFF;">${link}</p>
    </div>
  `,
  };

  try {
    const hashedtoken = await hashPassword(token);

    const newVerifiedEmail = await Verification.create({
      userId: _id,
      token: hashedtoken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    if (newVerifiedEmail) {
      transporter
        .sendMail(mailOptions)
        .then(() => {
          res.status(201).send({
            succes: "PENDING",
            message:
              "Verification email has been sent to your account. Check your email for further intructions.",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ message: "Somthing went wrong" });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Something went wrong",
    });
  }
};

export const requestPasswordLink = async (user, res) => {
  const { _id, email } = user;

  const token = _id + uuidv4();
  const link = APP_URL + "/users/reset-password/" + _id + "/" + token;

  //mail options

  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Password Reset",
    html: `
        <p>Haz clic en el enlace siguiente para restablecer tu contraseña:</p>
        <a href="${link}">Restablecer Contraseña</a>
    `,
  };

  try {
    const hashedToken = await hashPassword(token);

    const resetEmail = await PasswordReset.create({
      userId: _id,
      email: email,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });

    if (resetEmail) {
      transporter
        .sendMail(mailOptions)
        .then(() => {
          res.status(201).send({
            success: "PENDING",
            message: "Reset password link has been sent to your account.",
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json({
            message: "Something went wrong",
          });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Something went wrong",
    });
  }
};
