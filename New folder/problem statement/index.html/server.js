const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let complaints = [];

app.get('/api/complaints', (req, res) => {
    res.json(complaints);
});

app.post('/api/complaints', (req, res) => {
    const { name, email, department, complaint } = req.body;
    const newComplaint = { name, email, department, complaint, id: Date.now() };
    complaints.push(newComplaint);
    res.status(201).json(newComplaint);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

