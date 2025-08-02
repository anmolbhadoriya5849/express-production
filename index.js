import express from "express";

const app = express(); 
const port = 3000;

// app.get('/', (req,res) => {
//     res.send("Hello world from hitesh");
// })

// app.get('/ice-tea', (req,res) => {
//     res.send("Ordered ice-tea");
// })

app.use(express.json()); // this line tells my express if someone sends JSON data in a request (like in a POST request), please automatically parse it, so I can use it as req.body.

let teas = [];
let curr_id = 1;

 	// •	GET → Just fetch data
	// •	POST → Send new data to server
	// •	PUT → Update data
	// •	DELETE → Remove data

app.post('/', (req, res) => {
    const {name, price} = req.body;
    const newtea = {
        id: curr_id++,
        name,
        price
    }
    teas.push(newtea);
    res.status(200).send(newtea);
})

app.get('/', (req, res) => {
    res.status(200).send(teas);
})

app.get('/:id', (req, res) => {
    const tea = teas.find(t => t.id === parseInt(req.params.id));

    if(!tea){
        res.status(404).send('error:404, tea not found');
    }
    res.status(200).send(tea);
})

app.put('/:id', (req, res) => {
    const tea = teas.find(t => t.id === parseInt(req.params.id));

    if(!tea){
        res.status(404).send('error:404, tea not found');
    }

    const {name,price} = req.body;

    tea.price = price;
    tea.name = name;
    res.status(200).send(tea);
})

app.delete('/:id', (req, res) => {
    const index = teas.findIndex(t => t.id === parseInt(req.params.id));

    if(index === -1){
        res.status(404).send('tea not found to be deleted');
    }
    teas.splice(index,1);
    res.status(201).send('deleted');
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})