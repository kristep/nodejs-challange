import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';

import { officeRouter } from './src/routes/offices';
import { employeeRouter } from './src/routes/employees';

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.get('/hello', (req, res) => {
    res.send('Hello Sourcery!');
});

app.use(officeRouter);
app.use(employeeRouter);

app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).send('Page not found');
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
