let allUsers = [];

document.getElementById('greating').innerHTML = "Hello " + localStorage.getItem('name');

async function getUsers() {
    try{
        console.log("kkk");
        
        let response = await fetch('/users');
        if(response.status == 401){
            window.location.href='/login';
            return;
        }
        let data = await response.json();
        if(response.status == 400){
            alert(data.message);
        }
        console.log(data);
        allUsers = data;
        createUsersTable(data);
    }catch(err){
        alert(err)
    }
  
}


function createUsersTable(data) {
    let txt = "";
    for (let u of data) {
        console.log(u);
        txt += `<tr>`;
        txt += `<td>${u.name}</td>`;
        txt += `<td>${u.User_Name}</td>`;
        txt += `<td>${u.email}</td>`;
        txt += `<td><button onclick="deleteUser(${u.id})">🗑️</button></td>`;
        txt += `<td><button onclick="userToEdit(${u.id})">✏️</button></td>`;
        txt += `</tr>`;
    }
    document.getElementById('usersTable').innerHTML = txt;
}

async function addUser() {
    let Name = document.getElementById('name').value;
    let User_Name = document.getElementById('username').value;
    let Email = document.getElementById('email').value;
    if (!Name || !User_Name || !Email) { alert("Fill all fields"); return; }

    await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name, User_Name, Email })
    });
    clearForm();
    getUsers();
}

async function userToEdit(id) {
    let res = await fetch(`/users/${id}`);
    let data = await res.json();
    document.getElementById('id').value = data.id;
    document.getElementById('name').value = data.Name;
    document.getElementById('username').value = data.User_Name;
    document.getElementById('email').value = data.Email;
}

async function editUser(id) {
    let Name = document.getElementById('name').value;
    let User_Name = document.getElementById('username').value;
    let Email = document.getElementById('email').value;
    if (!Name || !User_Name || !Email) { alert("Fill all fields"); return; }

    await fetch(`/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name, User_Name, Email })
    });
    clearForm();
    getUsers();
}

async function deleteUser(id) {
    await fetch(`/users/${id}`, { method: 'DELETE' });
    getUsers();
}

function addOrEditUser() {
    let id = document.getElementById('id').value;
    if (id) { editUser(id); } else { addUser(); }
}

function clearForm() {
    document.getElementById('id').value = "";
    document.getElementById('name').value = "";
    document.getElementById('username').value = "";
    document.getElementById('email').value = "";
}

getUsers();