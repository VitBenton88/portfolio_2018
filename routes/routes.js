// Routes
// =============================================================
module.exports = function(app, dotenv, nodemailer, validator) {
    // homepage route
    app.get("/", (req, res) => {
      res.send("./public/index.html");
    });

    // redirect any route to homepage
    app.get("/*", (req, res) => {
      res.send("./public/index.html");
    });

    //handle Googles robots
    app.get('/robots.txt', function (req, res) {
        res.type('text/plain');
        res.send("User-agent: *\nDisallow: /");
    });

    //handle sitemap request
    app.get('/sitemap.txt', function (req, res) {
        res.send("./public/sitemap.txt");
    });

    //handle contact form
    app.post("/contact", (req, res) => {

      let replyTo = req.body.email;
      let name = req.body.name;
      let text = req.body.message;
      let subject = `${name} @ ${replyTo} contacted you through VitBenton.com!`;

      if (!validator.isEmpty(replyTo) && !validator.isEmpty(name) && !validator.isEmpty(text) && validator.isEmail(replyTo)) {

        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SER,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          replyTo,
          to: process.env.EMAIL_REC,
          subject,
          text
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });

        res.send(true);

      } else {
        res.send(false);
      };

    });
};
