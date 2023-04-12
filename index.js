const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.post('/send-mail', async (req, res) => {
    try {
        const { aceptacion, nombreUsuario, mail } = req.body;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'comandaferrero@gmail.com',
                pass: 'lqplikfqqedvuvis',
            },
        });

        let resultado = await transporter.sendMail({
            from: '"Mi Comanda" <comandaferrero@gmail.com>',
            to: mail,
            subject: aceptacion ? 'Felicitaciones su cuenta fue aceptada' : 'Disculpe pero hemos bloqueado su cuenta',
            html: `
        <h1>${aceptacion ? 'Felicitaciones ' : 'Disculpe '} ${nombreUsuario}</h1>
        <p>Su cuenta fue ${aceptacion ? 'aceptada' : 'rechazada'}</p>
        <p>Saludos La Comanda</p>
        `,
        });
        res.json({ ...resultado, seEnvio: true });
    } catch (e) {
        res.json({
            mensaje: 'No se pudo enviar el mail',
            seEnvio: false,
        });
    }
});

app.listen(process.env.PORT || 3000, () => console.log('App lista'));