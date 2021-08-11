import Joi from "joi";
// import { ObjectId } from "mongodb";
const { ObjectId } = require("mongodb");
import { getDB } from "*/config/mongodb.js";
const columnCollectionName = "columns";
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(), //also ObjectId when create new
    title: Joi.string().required().min(3).max(20).trim().trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const createNew = async (data) => {
    try {
        const validateValue = await validateSchema(data);
        const newValue = {
            ...validateValue,
            boardId: ObjectId(validateValue.boardId),
        };
        await getDB().collection(columnCollectionName).insertOne(newValue);

        return newValue;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        // const value = await validateSchema(data);
        const result = await getDB()
            .collection(columnCollectionName)
            .updateOne(
                {
                    _id: ObjectId(id),
                },
                { $set: data }
            );
        return await getDB()
            .collection(columnCollectionName)
            .findOne({
                _id: ObjectId(id),
            });
    } catch (error) {
        throw new Error(error);
    }
};

/**
 *
 * @param {string} boardId
 * @param {string} newColumnId
 * @returns
 */
const pushCardOrder = async (columnId, cardId) => {
    try {
        const result = await getDB()
            .collection(columnCollectionName)
            .findOneAndUpdate(
                {
                    _id: ObjectId(columnId),
                },
                {
                    $push: {
                        cardOrder: cardId,
                    },
                },
                { returnOriginal: false }
            );
        return await getDB()
            .collection(columnCollectionName)
            .findOne({
                _id: ObjectId(columnId),
            });
    } catch (error) {
        throw new Error(error);
    }
};

export const ColumnModel = {
    columnCollectionName,
    createNew,
    update,
    pushCardOrder,
};
