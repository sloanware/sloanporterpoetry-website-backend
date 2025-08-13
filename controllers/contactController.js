import validator from 'validator';
import nodemailer from 'nodemailer';

// @desc   Forward user message to personal email
// @route  POST /api/contact
// @auth   N/A
export const forwardMessage = async (req, res, next) => {
    try {
        const { name, email, message, website } = req.body;

        // Honeypot
        if (website && website.trim() !== '') {
            console.warn('Honeypot triggered. Possible spam bot.');
            return res.status(400).json({ msg: 'Spam detected.' });
        }

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ msg: 'All fields are required. Please fill them in.'});
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ msg: 'Invalid email address. Please try again.' });
        }
        if (message.length > 2000) {
            return res.status(400).json({ msg: 'Message is too long. Please try again.'});
        }

        // Sanitization
        const sanitizedName = validator.escape(name.trim());
        const sanitizedEmail = validator.normalizeEmail(email.trim());
        const sanitizedMessage = validator.escape(message.trim());

        console.log('Contact form message:', {
            name: sanitizedName,
            email: sanitizedEmail,
            message: sanitizedMessage,
        });

        // Forward message via Nodemailer and Outlook's SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587, // STARTTLS port
            secure: false, // Encryption happens after connections is established using STARTTLS
            auth: {
                user: process.env.OUTLOOK_EMAIL,
                pass: process.env.OUTLOOK_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.OUTLOOK_EMAIL,
            to: process.env.OUTLOOK_EMAIL,
            subject: 'New message from your poetry website!',
            text: `
                Name: ${sanitizedName},
                Email: ${sanitizedEmail},
                Message: ${sanitizedMessage}
            `,
            replyTo: `"${sanitizedName}" <${sanitizedEmail}>`, // Makes reply go to sender.
        };

        await transporter.sendMail(mailOptions);
        console.log('Message successfully sent.');

        return res.status(200).json({ msg: 'Message Sent!' });
    } catch (err) {
        next(err);
    }
};