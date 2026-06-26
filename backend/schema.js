const Joi = require('joi');

module.exports.listingSchema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.object({
            url: Joi.string().uri().allow(""),
            filename: Joi.string().allow(""),
        })
}).unknown(true);

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required().max(5).min(1),
    comment: Joi.string().required()
}).unknown(true);