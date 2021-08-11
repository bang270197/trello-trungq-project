import { CardModel } from "*/models/card.model";
import { ColumnModel } from "../models/column.model";
const createNew = async (data) => {
    try {
        const newCard = await CardModel.createNew(data);
        // console.log(newCard);
        const updateBoard = await ColumnModel.pushCardOrder(
            newCard.columnId.toString(),
            newCard._id.toString()
        );
        return newCard;
    } catch (error) {
        throw new Error(error);
    }
};

// const update = async (id, data) => {
//     try {
//         const updateData = {
//             ...data,
//             updateAt: Date.now(),
//         };
//         const result = await ColumnModel.update(id, updateData);
//         return result;
//     } catch (error) {
//         throw new Error(error);
//     }
// };

export const CardService = { createNew };
