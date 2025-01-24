const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(bodyParser.json());
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running...' })
})

app.use('/api/employees', employeeRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});