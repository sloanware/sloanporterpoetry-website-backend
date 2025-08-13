import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import contact from './routes/contact.js';
import newsletter from './routes/newsletter.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/error.js';

console.log("Server initiated...");

//Using ES Modules, so __filename and __dirname must be defined.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

//Frontend and backend hosted on separate domains, so CORS must be enabled.
app.use(cors({
  origin: [
    'https://www.sloanporterpoetry.com',
    'https://sloanporterpoetry.com',
    'https://sloanporterpoetry.netlify.app'
  ]
}));

//Routes.
app.use('/api/contact', contact);
app.use('/api/newsletter', newsletter);

//Custom error handler.
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});