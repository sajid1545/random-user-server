const fs = require('fs');

const getRandomUser = (req, res) => {
	fs.readFile('user.json', (err, data) => {
		if (err) return res.status(500).send({ success: false, message: err });
		const userData = JSON.parse(data);
		const randomUser = userData[Math.floor(Math.random() * userData.length)];
		res.status(200).send({ message: 'success', data: randomUser });
	});
};

const getAllUsers = (req, res) => {
	fs.readFile('user.json', (err, data) => {
		if (err) return res.status(500).send({ success: false, message: err });
		const userData = JSON.parse(data);
		res.status(200).send({ message: 'success', data: userData });
	});
};

const addUser = (req, res) => {
	fs.readFile('user.json', (err, data) => {
		if (err) return res.status(500).send({ success: false, message: err });
		const userData = JSON.parse(data);
		console.log(userData.length);
		const { gender, name, contact, address, photoURL } = req.body;
		const newUserInfo = {
			id: userData.length + 1,
			gender,
			name,
			contact,
			address,
			photoURL,
		};

		// validation
		if (!gender) return res.status(400).send({ success: false, message: 'gender is required' });
		if (!name) return res.status(400).send({ success: false, message: 'name is required' });
		if (!contact) return res.status(400).send({ success: false, message: 'contact is required' });
		if (!address) return res.status(400).send({ success: false, message: 'address is required' });
		if (!photoURL) return res.status(400).send({ success: false, message: 'photoURL is required' });

		fs.writeFile('user.json', JSON.stringify([...userData, newUserInfo]), (err) => {
			if (err) return res.status(500).send({ success: false, message: err });
			res.status(200).send({ message: 'success', data: newUserInfo });
		});
	});
};

module.exports = {
	getAllUsers,
	getRandomUser,
	addUser,
};
