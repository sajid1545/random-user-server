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
	const limit = Number(req.query.limit) || 10;
	fs.readFile('user.json', (err, data) => {
		if (err) return res.status(500).send({ success: false, message: err });
		const userData = JSON.parse(data);
		const limitedData = userData.slice(0, limit);
		res.status(200).send({ message: 'success', data: limitedData });
	});
};

const addUser = (req, res) => {
	fs.readFile('user.json', (err, data) => {
		if (err) return res.status(500).send({ success: false, message: err });
		const userData = JSON.parse(data);
		const { gender, name, contact, address, photoURL, id } = req.body;

		const newUserInfo = {
			id: id,
			gender,
			name,
			contact,
			address,
			photoURL,
		};

		// validation
		if (!id) return res.status(400).send({ success: false, message: 'id is required' });
		if (!gender) return res.status(400).send({ success: false, message: 'gender is required' });
		if (!name) return res.status(400).send({ success: false, message: 'name is required' });
		if (!contact) return res.status(400).send({ success: false, message: 'contact is required' });
		if (!address) return res.status(400).send({ success: false, message: 'address is required' });
		if (!photoURL) return res.status(400).send({ success: false, message: 'photoURL is required' });

		const isIdExists = userData.find((user) => user.id === id);
		if (isIdExists) return res.status(400).send({ success: false, message: 'id already exists' });

		fs.writeFile('user.json', JSON.stringify([...userData, newUserInfo]), (err) => {
			if (err) return res.status(500).send({ success: false, message: err });
			res.status(200).send({ message: 'success', data: newUserInfo });
		});
	});
};

const updateSingleUser = (req, res) => {
	const { id } = req.params;
	if (isNaN(id)) return res.status(400).send({ success: false, message: 'id must be a number' });

	fs.readFile('user.json', (err, data) => {
		if (err) return res.status(500).send({ success: false, message: err });
		let userData = JSON.parse(data.filter((user) => user.id !== id));
		console.log(userData);
		const updatedData = userData.find((user) => user.id === id);
		if (!updatedData)
			return res.status(400).send({ success: false, message: `user with id - ${id} not found` });

		const { gender, name, contact, address, photoURL } = req.body;

		const updatedDoc = {
			id: id,
			gender: gender || updatedData.gender,
			name: name || updatedData.name,
			contact: contact || updatedData.contact,
			address: address || updatedData.address,
			photoURL: photoURL || updatedData.photoURL,
		};

		const output = userData.filter((user) => user.id !== id);
		const newData = [...output, updatedDoc];

		fs.writeFile('user.json', JSON.stringify(newData), (err) => {
			if (err) return res.status(500).send({ success: false, message: err });
			res.status(200).send({ message: 'success' });
		});
	});
};

module.exports = {
	getAllUsers,
	getRandomUser,
	addUser,
	updateSingleUser,
};
