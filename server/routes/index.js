const express = require('express');
const router = express.Router();

router.all("*", (req, res, next) => {
    try {
    

    } catch (e) {
        throw e;
    };

    next();
});


module.exports = {
    router: router
} 
