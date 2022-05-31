const database = require('../database');

const create = async (data) => {
  const query = `INSERT INTO posts (text, user_id) VALUES ($1, $2) returning *`;
  const values = [data.text, data.user_id];
  const result = await database.query(query, values);
  return result.rows[0];
};

const createChild = async (parent_id, data) => {
  const query = `INSERT INTO posts (text, user_id, parent_id) VALUES ($1, $2, $3) returning *`;
  const values = [data.text, data.user_id, parent_id];
  const result = await database.query(query, values);
  return result.rows[0];
};

const getById = async (id) => {
  const query =
    'SELECT posts.*, users.nickname FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.id = $1';
  const values = [id];
  const result = await database.query(query, values);
  return result.rows[0];
};

const getAllByParentId = async (parent_id) => {
  const query =
    'SELECT posts.*, users.nickname FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.parent_id = $1';
  const values = [parent_id];
  const result = await database.query(query, values);
  return result.rows;
};

const getAllByUserId = async (parent_id) => {
  const query =
    'SELECT posts.*, users.nickname FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.user_id = $1 AND posts.parent_id IS NULL';
  const values = [parent_id];
  const result = await database.query(query, values);
  return result.rows;
};

const getAll = async () => {
  const query =
    'SELECT posts.*, users.nickname FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.parent_id IS NULL ORDER BY posts.id DESC';
  const result = await database.query(query);
  return result.rows;
};

const deleteById = async (id) => {
  const query = `DELETE FROM posts WHERE id = $1 returning *`;
  const values = [id];
  const result = await database.query(query, values);
  return result;
};

const updateById = async (id, data) => {
  const query = `UPDATE posts SET text = $1 WHERE id = $2 returning *`;
  const values = [data.text, id];
  const result = await database.query(query, values);
  return result;
};

module.exports = {
  create,
  createChild,
  getById,
  getAllByParentId,
  getAllByUserId,
  getAll,
  deleteById,
  updateById
};
