import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  const search = req.query.search_query || "";
  const last_id = parseInt(req.query.last_id) || 0;
  const limit = parseInt(req.query.limit) || 10;

  let result = [];

  try {
    if (last_id < 1) {
      const results = await User.findAll({
        where: {
          [Op.or]: [
            { nom: { [Op.like]: "%" + search + "%" } },
            { prenom: { [Op.like]: "%" + search + "%" } },
            { email: { [Op.like]: "%" + search + "%" } },
          ],
        },
        limit: limit,
        order: [["id", "DESC"]],
      });
      result = results;
    } else {
      const results = await User.findAll({
        where: {
          id: { [Op.lt]: last_id },
          [Op.or]: [
            { nom: { [Op.like]: "%" + search + "%" } },
            { prenom: { [Op.like]: "%" + search + "%" } },
            { email: { [Op.like]: "%" + search + "%" } },
          ],
        },
        limit: limit,
        order: [["id", "DESC"]],
      });
      result = results;
    }

    res.json({
      result: result,
      lastId: result.length ? result[result.length - 1].id : 0,
      hasMore: result.length >= limit ? true : false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
