const db = require('../config/db_config');

async function getAll(userId) {
    const [rows] = await db.query(`SELECT * FROM categories WHERE user_id = ?`, [userId]);
    return rows;
}

async function add({ name, userId }) {
    const [result] = await db.query(`INSERT INTO categories (name,user_id) VALUES (?,?)`, [name, userId]);
    return result.insertId;
}

async function getOne(catId, userId) {
    const [rows] = await db.query(`SELECT * FROM categories WHERE id = ? AND user_id = ?`, [catId, userId]);
    return rows[0];
}

async function remove(catId, userId) {
    const [result] = await db.query(`DELETE FROM categories WHERE id = ? AND user_id = ?`, [catId, userId]);
    return result.affectedRows;
}

async function update(catId, userId, newName) {
    const [result] = await db.query(`UPDATE categories SET name = ? WHERE id = ? AND user_id = ?`, [newName, catId, userId]);
    return result.affectedRows;
}

module.exports = { getAll, add, getOne, remove, update };
