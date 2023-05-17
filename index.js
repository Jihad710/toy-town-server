const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// middlewar
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Toy town is running')
})

app.listen(port, () => {
    console.log(`Toy Town Server is running on port ${port}`)
})