import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/output.json';

import { router } from './routes';
import bodyParser from 'body-parser';
import path from 'path';

const PORT = 3333;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(
    '/files',
    express.static(path.join(process.cwd(), 'src/modules/extractor/invoices'))
);

app.use('/api/', router);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});
