// subscriberController.js
const Subscriber = require('../models/newsletter');
exports.subscribe = async (req, res) => {
    const { email } = req.body;

    try {
        const subscriber = new Subscriber({ email });
        await subscriber.save();
        res.status(201).send("Merci de vous être abonné à notre newsletter !");
    } catch (error) {
        res.status(201).send('Erreur lors de l\'enregistrement de l\'abonné');
    }
};
