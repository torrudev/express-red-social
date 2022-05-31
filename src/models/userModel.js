const database = require('../database');
const postModel = require('./postModel');

const getById = async (id) => {
  const query = `SELECT * FROM users WHERE id = ${id}`;
  const result = await database.query(query);
  return result.rows[0];
};

const deleteById = async (id) => {
  const userPosts = await postModel.getAllByUserId(id);
  userPosts.forEach(async (post) => {
    await postModel.deleteById(post.id);
  });
  const query = `DELETE FROM users WHERE id = ${id} returning *`;
  const result = await database.query(query);
  return result;
};

const updateById = async (id, data) => {
  const query = `UPDATE users SET ${Object.keys(data).map(
    (key) => `${key} = '${data[key]}'`
  )} WHERE id = ${id} returning *`;
  const result = await database.query(query);
  return result;
};

module.exports = { getById, deleteById, updateById };
