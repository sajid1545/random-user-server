const express = require('express');
const app = express();
const port = 5000;
const userRoutes = require('./routes/v1/user.routes');

// middlewares

app.use(express.json());

// routes

app.use('/api/v1/user', userRoutes);


app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}!`);
});
