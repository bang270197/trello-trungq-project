import Joi from "joi";
const { ObjectId } = require("mongodb");
import { getDB } from "*/config/mongodb.js";
const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(), //also ObjectId when create new
    columnId: Joi.string().required(), //also ObjectId when create new
    title: Joi.string().required().min(3).max(20).trim(),
    cover: Joi.string().default(null),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const createNew = async (data) => {
    try {
        const validateValue = await validateSchema(data);
        const insetValue = {
            ...validateValue,
            boardId: ObjectId(validateValue.boardId),
            columnId: ObjectId(validateValue.columnId),
        };
        const result = await getDB()
            .collection(cardCollectionName)
            .insertOne(insetValue);
        return insetValue;
    } catch (error) {
        throw new Error(error);
    }
};

export const CardModel = { cardCollectionName, createNew };
