const sgMail = require("@sendgrid/mail");
const { SEND_GRID_API_KEY, PORT } = process.env;

const BASE_URL = `http://localhost:${PORT}/api`;

const sendEmail = async (userEmail, code) => {
  sgMail.setApiKey(SEND_GRID_API_KEY);
  const link = `${BASE_URL}/users/verify/${code}`;

  const msg = {
    to: userEmail,
    from: "levkosirko@gmail.com",
    subject: "Confirm your email",
    html: `<h4>Click on this link to confirm registration ${link}</h4>`,
  };

  try {
    const result = await sgMail.send(msg);
  } catch (e) {
    throw e;
  }
};

module.exports = { sendEmail };
