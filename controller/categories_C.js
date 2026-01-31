const { getAll, add, getOne, remove, update } = require('../model/categories_M.js');

async function getAllCategories(req, res) {
    try {
        const categories = await getAll(req.user.id);
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

async function addCategory(req, res) {
    try {
        const { name } = req.body;
        const userId = req.user.id;
        const categoryId = await add({ name, userId });
        res.status(201).json({ message: "נוסף בהצלחה", id: categoryId });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

async function getCategory(req, res) {
    try {
        const category = await getOne(req.params.id, req.user.id);
        if (!category) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

async function deleteCategory(req, res) {
    try {
        let id = req.params.id; 
        let result = await remove(id, req.user.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "נמחק בהצלחה" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}



async function updateCategory(req, res) {
    try {
        const affectedRows = await update(req.params.id, req.user.id, req.body.name);
        if (!affectedRows) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "updated!" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getAllCategories,
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory
};
