import nodemailer from "nodemailer";
import { Controller } from "../types.js";
import { StatusCodes } from "http-status-codes";

const sendEmail: Controller = async (req, res) => {
  const userId = req.user?.userId;
  const { from, task, receivers, taskId } = req.body;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // secure: false,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.APP_URL}`
      : "http://localhost:5000";

  const taskLink = `${baseUrl}/tasks/${userId}/${taskId}`;

  let htmlBody = `
  <p>You have been assigned a new task from ${from} : <strong>${task}</strong></p>
  <p>Click <a href="${taskLink}">HERE</a> to view the task and track updates</p>
  `;

  let info = await transporter.sendMail({
    from: `"${from}" <${process.env.EMAIL_USER}>`,
    to: receivers,
    subject: `New Task: ${task}`,
    html: htmlBody,
  });
  res.status(StatusCodes.OK).end();
  const infoText = `
  From: ${from}
  To: ${receivers.map((r: any) => r.address).join(", ")}
  Subject: New Task: ${task}
  Body: ${htmlBody}
`;
  await transporter.sendMail({
    from: `"KANBAN APP" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN,
    subject: "Someone Used Your App",
    text: infoText,
  });
};

export default sendEmail;
