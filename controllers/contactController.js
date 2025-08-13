import validator from 'validator';
import isDisposableEmail from 'is-disposable-email';

// @desc   Forward user message to personal email
// @route  POST /api/contact
// @auth   N/A
export const forwardMessage = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json( {msg: 'All fields are required. Please fill them in.' });
        }
        
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
        if (isDisposableEmail(email)) {
            return res.status(400).json({ msg: 'Disposable email addresses are not allowed.' });
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

        // Send email via MailerSend API
        const response = await fetch('https://api.mailersend.com/v1/email', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.MAILERSEND_EMAIL_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: { email: 'no-reply@sloanporterpoetry.com' },
                to: [{ email: 'sloanporter@outlook.com' }],
                subject: 'New message from your poetry website!',
                text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`
            })
        });

        if (!response.ok) {
            throw new Error('MailerSend API error.');
        }

        console.log('Message successfully sent via MailerSend.');

        return res.status(200).json({ msg: 'Message Sent!' });
    } catch (err) {
        next(err);
    }
};