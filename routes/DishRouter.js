const express = require("express");
const Dishes = require("../models/dishes");
const router = express.Router();

router.get("", async (req,res) => {
    try {
        dishes = await Dishes.find({})
        res.status(200).send(dishes);
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post("", async (req, res) => {
    try {
        let Dish = new Dishes({
            ...req.body
        });
        await Dish.save();
        res.status(201).send(Dish);   
    } catch (error) {
        res.status(400).send(error);
    }
})
router.put("", async (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
router.delete("", async (req, res) => {
    try {
        let dishes = await Dishes.remove({})
        res.status(200).send(dishes);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get("/:dishId", async (req,res) => {
    try {
        let Dish = await Dishes.findById(req.params.dishId);
        res.status(200).send(Dish);
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post('/:dishId', async (req,res) => {
    res.statusCode = 403;
    res.end("Post is not supported with "+req.params.dishId);
})
router.put('/:dishId', async (req,res) => {
    try {
        let Dish = await Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true })
        res.status(200).send(Dish);
    } catch (error) {
        res.status(400).send(error);
    }
})
router.delete('/:dishId', async (req,res) => {
    try {
        let Dish = await Dishes.findByIdAndRemove(req.params.dishId);
        res.status(200).send(Dish);
    } catch (error) {
        res.status(400).send(error);    
    }
});

module.exports = router;