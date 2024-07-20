const ReservationTable = require('../models/reservation-table');


exports.createReservation = async (req, res) => {
    try {
        const { tableId } = req.body;
        
        const existingReservation = await ReservationTable.findOne({ tableId });
        if (existingReservation) {
            return res.status(301).json({ message: 'Cette table est déjà réservée.' });
        }

        const newReservation = new ReservationTable({ tableId });
        const savedReservation = await newReservation.save();

        res.status(201).json(savedReservation);
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: 'Une erreur est survenue lors de la réservation de la table.' });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const { tableId } = req.params;
        
        const existingReservation = await ReservationTable.findOne({ tableId });
        if (!existingReservation) {
            return res.status(301).json({ message: 'Cette table n\'a pas été réservée.' });
        }
    
        await ReservationTable.deleteOne({ tableId });
        res.status(201).json({ message: `La réservation de la table ${tableId} a été annulée.` });
    } catch (error) {
        console.error(error);
        res.status(403).json({ message: 'Une erreur est survenue lors de l\'annulation de la réservation.' });
    }
};

exports.getReservedTables = async (req, res) => {
    try {
      const reservations = await ReservationTable.find({}, 'roomId tableId');
      res.status(200).json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des tables réservées.' });
    }
  };
  