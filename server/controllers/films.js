const Film = require("../db/models/Film");
const mongoose = require("mongoose");

const getAllFilms = async (req, res) => {

    await Film.find({})
    .exec()
    .then(films => {
        res.status(200).json({films})
    })
};

const loadNewFilms = async (req, res) => {

    const arrayOfFilms = req.body.films;

    await Film.insertMany(arrayOfFilms, async function(error, films) {
        if(!error){
            await await Film.find({})
            .exec()
            .then(newCollectionFilms => {
                res.status(200).json({films:newCollectionFilms})
            })
        }
    });
};

const delFilm = async (req, res) => {

    await Film.deleteOne({ _id:req.body._id}, async function (err) {
        if (!err){
            await Film.find({})
            .exec()
            .then(films => {
                res.status(200).json({films})
            })
        } 
    });
};

const addFilm = async (req, res) => {
    try {
        const newFilm = new Film({
            _id: new mongoose.Types.ObjectId(),
            ...req.body.film
        })

        await Film.create(newFilm);
        await Film.find({})
        .then(films => {
            res.status(200).json({films})
        })

    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    getAllFilms,
    loadNewFilms,
    delFilm,
    addFilm,
};