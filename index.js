import express from "express"
import cors from "cors"
import helmet from "helmet"
import { officeRouter } from "./src/routes/offices.ts"
import { employeeRouter } from "./src/routes/employees.ts"

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(helmet())

app.get('/hello', (req, res) => {
    res.send('Hello Sourcery!');
});

app.use('/', officeRouter)
app.use('/', employeeRouter)

app.listen(port, () => console.log(`App listening on port ${port}!`))

