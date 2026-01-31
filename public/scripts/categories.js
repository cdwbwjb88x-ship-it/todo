document.addEventListener('DOMContentLoaded', () => {
    let allCategories = [];
    let allTasks = [];

    let greeting = "Hello " + localStorage.getItem('name');
    const greetingEl = document.getElementById('greating');
    if(greetingEl) greetingEl.innerHTML = greeting;

    async function getCategories() {
        const res = await fetch('/categories');
        allCategories = await res.json();
        createCategoriesTable(allCategories);
    }

    function createCategoriesTable(data) {
        let txt = "";
        for (let c of data) {
            txt += `<tr>
                <td>${c.name}</td>
                <td><button onclick="deleteCategory(${c.id})">🗑️</button></td>
                <td><button onclick="categoryToEdit(${c.id})">✏️</button></td>
            </tr>`;
        }
        document.getElementById('categoriesTable').innerHTML = txt;
    }

    async function getTasks() {
        const res = await fetch('/tasks');
        allTasks = await res.json();
    }

    async function addCategory() {
        const name = document.getElementById('name').value.trim();
        if (!name) return;

        const res = await fetch('/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        if(!res.ok) {
            const err = await res.json();
            alert(err.message);
            return;
        }

        clearForm();
        await getCategories();
    }

    async function editCategory(id) {
        const name = document.getElementById('name').value.trim();
        if (!name) return;

        const res = await fetch(`/categories/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        if(!res.ok) {
            const err = await res.json();
            alert(err.message);
            return;
        }

        clearForm();
        await getCategories();
    }

    async function categoryToEdit(id) {
        const res = await fetch(`/categories/${id}`);
        const data = await res.json();
        document.getElementById('id').value = data.id;
        document.getElementById('name').value = data.name;
    }

    async function deleteCategory(id) {
        const ok = confirm("אם תמחק קטגוריה זו, כל המשימות המשויכות אליה יימחקו.\nהאם ברצונך להמשיך?");
        if (!ok) return;

        const relatedTasks = allTasks.filter(task => task && task.CategoryID == id);
        for (let task of relatedTasks) {
            await fetch(`/tasks/${task.id}`, { method: 'DELETE' });
        }

        const res = await fetch(`/categories/${id}`, { method: 'DELETE' });
        if(!res.ok) {
            const err = await res.json();
            alert(err.message);
            return;
        }

        await getCategories();
        await getTasks();
    }

    function addOrEditCategory() {
        const id = document.getElementById('id').value;
        if (id) editCategory(id); else addCategory();
    }

    function clearForm() {
        document.getElementById('id').value = "";
        document.getElementById('name').value = "";
    }

    async function init() {
        await getCategories();
        await getTasks();
    }

    init();

    // expose functions to global for buttons
    window.addOrEditCategory = addOrEditCategory;
    window.deleteCategory = deleteCategory;
    window.categoryToEdit = categoryToEdit;
});
