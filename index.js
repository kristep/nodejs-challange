import express from "express"
import cors from "cors"
import helmet from "helmet"

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(helmet())

app.get('/hello', (req, res) => {
    res.send('Hello Sourcery!');
});

app.listen(port, () => console.log(`App listening on port ${port}!`))

