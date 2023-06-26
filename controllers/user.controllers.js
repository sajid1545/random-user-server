const fs = require('fs');

const getRandomUser = (req, res) => {
	fs.readFile('user.json', (err, data) => {
		if (err) return res.status(500).send({ success: true, message: err });
		const userData = JSON.parse(data);
		const randomUser = userData[Math.floor(Math.random() * userData.length)];
		res.status(200).send({ message: 'success', data: randomUser });
	});
};

const getAllUsers = (req, res) => {
	fs.readFile('user.json', (err, data) => {
		if (err) return res.status(500).send({ success: true, message: err });
		const userData = JSON.parse(data);
		res.status(200).send({ message: 'success', data: userData });
	});
};

module.exports = {
	getAllUsers,
	getRandomUser,
};
