let users = [];

const addUserButton = document.querySelector("#addUserButton");
const searchInput = document.getElementById("search");

function create() {
  document.querySelector(".create_form").style.display = "block";
  document.querySelector(".add_button").style.display = "none";
}

function add() {
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const age = parseInt(document.getElementById("age").value);
  if (isNaN(age) || age <= 0) {
    alert("Error: Please enter a valid age greater than 0.");
    return;
  }
  const email = document.getElementById("email").value;
  const totalSpending = parseFloat(
    document.getElementById("totalSpending").value
  );
  if (totalSpending <= 0 || isNaN(totalSpending)) {
    alert("Error: Total spending cannot be 0 or a negative value.");
    return;
  }
  var newId = users.length + 1;
  var newObj = {
    id: newId,
    name: name,
    surname: surname,
    email: email,
    age: age,
    totalSpending: totalSpending,
  };
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    alert("Error: A user with this email already exists.");
    return;
  }

  users.push(newObj);
  document.querySelector(".create_form").style.display = "none";
  document.querySelector(".add_button").style.display = "block";

  readAll();
}

function edit(email) {
  addUserButton.style.display = 'none';
  document.querySelector(".update_form").style.display = "block";
  document.querySelector(".create_form").style.display = "none";
  var obj = users.find((user) => user.email === email);
  document.getElementById("uname").value = obj.name;
  document.getElementById("usurname").value = obj.surname;
  document.getElementById("uemail").value = obj.email;
  document.getElementById("uage").value = obj.age;
  document.getElementById("utotalSpending").value = obj.totalSpending;
  if (obj.totalSpending <= 0 || isNaN(obj.totalSpending)) {
    alert("Error: Total spending cannot be 0 or a negative value.");
    return;
  }
  document.getElementById("id").value = obj.id; 
}

function update() {
  var name = document.getElementById("uname").value;
  var surname = document.getElementById("usurname").value;
  var email = document.getElementById("uemail").value;
  var age = document.getElementById("uage").value;
  var totalSpending = document.getElementById("utotalSpending").value;
  if (totalSpending <= 0 || isNaN(totalSpending)) {
    alert("Error: Total spending cannot be 0 or a negative value.");
    return;
  }
  var id = parseInt(document.getElementById("id").value);
  var index = users.findIndex((rec) => rec.id === id);
  users[index] = { id, name, surname, email, age, totalSpending };

  document.querySelector(".update_form").style.display = "none";
  readAll();
  addUserButton.setAttribute("style", '')
}

function del(email) {
  users = users.filter((user) => user.email !== email);
  console.log(`Deleted user with email: ${email}`);
  readAll();
}


function readAll() {
  const searchValue = searchInput.value.toLowerCase();

  const innerUsers = users
    .sort((a, b) => a.age - b.age)
    .filter(user => user.name.toLowerCase().includes(searchValue));
  // let object = localStorage.getItem("object");
  // let objectdata = JSON.parse(object);
  let elements = "";
  if(searchValue && innerUsers.length === 0) {
    elements = `<tr>
      <td colspan="7">Sonuc bulunamadi</td>
    </tr>`
  } else {
    innerUsers.forEach((user, index) => {
      elements += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${user.name}</td>
        <td>${user.surname}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${user.totalSpending} </td>
        <td>
          <button class="edit" onclick={edit('${user.email}')}>Edit</button>
          <button class="delete" onclick="del('${user.email}')">Delete</button>
        </td>
      </tr>`;
    });
  }

  let tabledata = document.querySelector(".data-table");
  tabledata.innerHTML = elements;

  const toplamHarcama = document.querySelector("#toplamHarcama");
  const under18 = document.querySelector("#under18");
  const averageAge = document.querySelector("#averageAge");
  
  if(innerUsers.length > 0) {
    let allTotal = 0;
    let under18Count = 0;
    let allAge = 0
    innerUsers.forEach(user => {
      allTotal += user.totalSpending;

      allAge += user.age;
      if(user.age < 18) {
        under18Count++;
      }
    });
    allTotal = allTotal / innerUsers.length;
    allAge = allAge / innerUsers.length;
    toplamHarcama.innerText = (allTotal + "₺");
    under18.innerHTML = under18Count;
    averageAge.innerText = Math.round(allAge)
  }

  if(!searchValue) {
    localStorage.setItem("storage::users", JSON.stringify(innerUsers));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let storedUsers = JSON.parse(
    localStorage.getItem("storage::users") || "[]"
  );
  if (storedUsers.length > 0) {
    users = storedUsers;
  } else {
    users = [
      {
        id: 1,
        name: "Ahmet",
        surname: "Yılmaz",
        age: 25,
        email: "ahmet@gmail.com",
        totalSpending: 500,
      },
      {
        id: 2,
        name: "Ayşe",
        surname: "Kara",
        age: 19,
        email: "ayse@gmail.com",
        totalSpending: 300,
      },
      {
        id: 3,
        name: "Mehmet",
        surname: "Çelik",
        age: 32,
        email: "mehmet@gmail.com",
        totalSpending: 1000,
      },
      {
        id: 4,
        name: "Fatma",
        surname: "Demir",
        age: 16,
        email: "fatma@gmail.com",
        totalSpending: 200,
      },
    ];
  }

  searchInput.addEventListener("input", readAll)

  readAll();
});
