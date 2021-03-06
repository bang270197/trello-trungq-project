import Joi from "joi";
import { getDB } from "*/config/mongodb.js";
import { ColumnModel } from "./column.model";
import { CardModel } from "./card.model";
const { ObjectId } = require("mongodb");
const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20).trim(),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await boardCollectionSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB()
            .collection(boardCollectionName)
            .insertOne(value);
        return await getDB()
            .collection(boardCollectionName)
            .findOne({
                _id: ObjectId(value._id),
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
const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .findOneAndUpdate(
                {
                    _id: ObjectId(boardId),
                },
                {
                    $push: {
                        columnOrder: columnId,
                    },
                },
                { returnOriginal: false }
            );
        return await getDB()
            .collection(boardCollectionName)
            .findOne({
                _id: ObjectId(boardId),
            });
    } catch (error) {
        throw new Error(error);
    }
};

const getFullBoard = async (boardId) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .aggregate([
                {
                    $match: {
                        _id: ObjectId(boardId),
                    },
                },
                // {
                //     $addFields: {
                //         _id: {
                //             $toString: "$_id",
                //         },
                //     },
                // },
                {
                    $lookup: {
                        from: ColumnModel.columnCollectionName,
                        localField: "_id",
                        foreignField: "boardId",
                        as: "columns",
                    },
                },
                {
                    $lookup: {
                        from: CardModel.cardCollectionName,
                        localField: "_id",
                        foreignField: "boardId",
                        as: "cards",
                    },
                },
            ])
            .toArray();
        return result[0] || {};
    } catch (error) {
        throw new Error(error);
    }
};

export const BoardModel = { createNew, getFullBoard, pushColumnOrder };
