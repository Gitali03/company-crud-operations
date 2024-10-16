 
 var users = [
    { id:1, name: "Ahmet", surname: "Yılmaz", age: 25, email: "ahmet@gmail.com", totalSpending: 500 },
    { id:2, name: "Ayşe", surname: "Kara", age: 19, email: "ayse@gmail.com", totalSpending: 300 },
    { id:3, name: "Mehmet", surname: "Çelik", age: 32, email: "mehmet@gmail.com", totalSpending: 1000 },
    { id:4, name: "Fatma", surname: "Demir", age: 16, email: "fatma@gmail.com", totalSpending: 200 }
];

function readAll() {
    users.sort((a, b) => a.age - b.age);
    localStorage.setItem ("object", JSON.stringify(users));
    let tabledata = document.querySelector (".data-table");
    let object = localStorage.getItem ('object');
    let objectdata = JSON.parse(object);
    let elements = "";
    objectdata.forEach((user, index) => {
        elements += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.totalSpending} </td>
                <td>
                    <button class="edit" onclick={edit(${user.id})}>Edit</button>
                    <button class="delete">Delete</button>
                </td>
            </tr>
        `;
    });

    // Tabloya veriyi ekle
    tabledata.innerHTML = elements;

}


function create() {
    document.querySelector(".create_form").style.display ="block";
    document.querySelector(".add_button").style.display="none";

}

function add(){
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const age = parseInt(document.getElementById("age").value);
    const email = document.getElementById("email").value;
    const totalSpending = parseFloat(document.getElementById("totalSpending").value);
    var newId = users.length + 1;
    var newObj = {id:newId, name:name, surname:surname, email:email, age:age, totalSpending:totalSpending};
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("Hata: Bu email adresi ile kayıtlı bir kullanıcı zaten var."); // Kullanıcıya hata mesajı göster
        return; // Fonksiyondan çık
    }
   
    users.push(newObj);
    document.querySelector(".create_form").style.display= "none";
    document.querySelector(".add_button").style.display="block";

    readAll();
}

function edit(id){
    document.querySelector('.update_form').style.display= "block";
    document.querySelector(".create_form").style.display= "none";
    var obj = users.find (rec => rec.id === id);
    document.getElementById("uname").value = obj.name;  // İsim alanına kullanıcı ismini yerleştir
    document.getElementById("usurname").value = obj.surname;  // Soyisim alanına kullanıcı soyadını yerleştir
    document.getElementById("uemail").value = obj.email;  // Email alanına kullanıcı emailini yerleştir
    document.getElementById("uage").value = obj.age;  // Yaş alanına kullanıcı yaşını yerleştir
    document.getElementById("utotalSpending").value = obj.totalSpending; 
    document.getElementById("id").value = obj.id;

}

function update() {
    var name = document.getElementById("uname").value 
    var surname = document.getElementById("usurname").value 
    var email = document.getElementById("uemail").value
    var age = document.getElementById("uage").value 
    var totalSpending =document.getElementById("utotalSpending").value 
    var id = parseInt(document.getElementById("id").value)
    var index = users.findIndex(rec => rec.id === id);
    users[index] = {id, name, surname,email,age,totalSpending};

    document.querySelector('.update_form').style.display = "none";
    readAll();

}

