export default async (req, lister, nodemailer, nodemailerSendgrid) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    })
  );

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"${req.get("host")} 👻" '<enalsy22@gmail.com>' `, // sender address
    to: lister.email, // list of receivers
    subject: "Successful signup", // Subject line
    text: "Hello world?", // plain text body
    html: `
    <h1>Hello ${lister.fullname} </h1>
    <h3>Thank you for joining our waiting mail list.</h3></br>
      <p>We are excited to have you join the waiting mail list. We will keep you updated when we launch fully.</p></br></br>
      <p>You are wonderful</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
