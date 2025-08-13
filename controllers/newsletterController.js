import validator from 'validator';

// @desc   Adds email to subscriber list
// @route  POST /api/newsletter
// @auth   N/A
export const addEmail = async (req, res, next) => {

    try {

        const { email } = req.body;

        // Validation
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ msg: 'Please provide a valid email address.' });
        }

        // Sanitization
        const sanitizedEmail = validator.normalizeEmail(email.trim());

        // Send to MailerSend
        const response = await fetch('https://api.mailersend.com/v1/recipients', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.MAILERSEND_RECIPIENT_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: sanitizedEmail
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('MailerSend error:', errorData);
            return res.status(response.status).json({ msg: 'Failed to add email to newsletter. Please try again later or use the contact form below!' });

        }

        return res.status(200).json({ msg: 'Successfully subscribed to the newsletter!' });

    } catch (err) {
        next(err);
    }
};