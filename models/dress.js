const express = require('express');
const Dress = require('../models/dress');
const router = express.Router();

// Get all dresses
router.get('/', async (req, res) => {
    try {
        const dresses = await Dress.find();
        res.json(dresses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one dress
router.get('/:id', getDress, (req, res) => {
    res.json(res.dress);
});

// Create a dress
router.post('/', async (req, res) => {
    const dress = new Dress({
        name: req.body.name,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        inStock: req.body.inStock,
    });
    try {
        const newDress = await dress.save();
        res.status(201).json(newDress);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a dress
router.patch('/:id', getDress, async (req, res) => {
    if (req.body.name != null) {
        res.dress.name = req.body.name;
    }
    if (req.body.size != null) {
        res.dress.size = req.body.size;
    }
    if (req.body.color != null) {
        res.dress.color = req.body.color;
    }
    if (req.body.price != null) {
        res.dress.price = req.body.price;
    }
    if (req.body.inStock != null) {
        res.dress.inStock = req.body.inStock;
    }
    try {
        const updatedDress = await res.dress.save();
        res.json(updatedDress);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a dress
router.delete('/:id', getDress, async (req, res) => {
    try {
        await res.dress.remove();
        res.json({ message: 'Deleted Dress' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a dress by ID
async function getDress(req, res, next) {
    let dress;
    try {
        dress = await Dress.findById(req.params.id);
        if (dress == null) {
            return res.status(404).json({ message: 'Cannot find dress' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.dress = dress;
    next();
}

module.exports = router;
