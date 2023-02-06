

let form = document.querySelector("#form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let product = {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        name: document.querySelector("#inputProductName").value,
        price: document.querySelector("#inputProductPrice").value,
        quantity: document.querySelector("#inputProductQuantity").value,
        description: document.querySelector("#inputProductDescription").value
    };

    //Store the product in Local Storage

    let products = [];
    loc_products = localStorage.getItem("products");
    if (loc_products) {
        products = JSON.parse(loc_products);

    }
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));


    viewProductDetails();


});
var id_count = 1;

// View Product Details
function viewProductDetails() {
    let storedArray = JSON.parse(localStorage.getItem("products"));
    let tbody = document.querySelector("#datatable #table")
    // let table = document.getElementById("table");
    // table.innerHTML = "<tr><th>Name</th><th>Age</th><th>City</th></tr>";
    tbody.innerHTML = "";
    for (let i = 0; i < storedArray.length; i++) {
        let obj = storedArray[i];

        let row = document.createElement("tr");

        let idCell = document.createElement("td");

        idCell.textContent = id_count;
        row.appendChild(idCell);
        id_count++;

        let nameCell = document.createElement("td");
        nameCell.textContent = obj.name;
        row.appendChild(nameCell);

        let quantityCell = document.createElement("td");
        quantityCell.textContent = obj.quantity;
        row.appendChild(quantityCell);

        let priceCell = document.createElement("td");
        priceCell.textContent = obj.price;
        row.appendChild(priceCell);


        let totalCell = document.createElement("td");
        let total = obj.price * obj.quantity;
        totalCell.textContent = total;
        row.appendChild(totalCell);

        let descriptionCell2 = document.createElement("td");
        descriptionCell2.textContent = obj.description;
        row.appendChild(descriptionCell2);



        let cell = document.createElement("td");
        row.appendChild(cell)

        let editCell = document.createElement("button");
        editCell.textContent = "Edit";
        editCell.id = obj.id;
        row.appendChild(editCell);
        editCell.onclick = editRow;

        row.appendChild(cell);

        let deleteCell = document.createElement("button");
        deleteCell.textContent = "Delete";
        deleteCell.id = obj.id;

        deleteCell.onclick = deleteRow;
        cell.appendChild(deleteCell);

        tbody.appendChild(row);
    }
    // localStorage.clear(products);
    // document.querySelector("#datatable tbody").innerHTML = table;
    id_count = 1;
}


function deleteRow() {
    let storedArray = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < storedArray.length; i++) {
        if (this.id == storedArray[i].id) {
            storedArray.splice(i, 1);
            localStorage.setItem("products", JSON.stringify(storedArray));

        }


    }
    if (id_count == 1) {
        id_count = 1;
    } else {
        id_count -= 1;
    }
    viewProductDetails();

}



window.addEventListener("load", function () {
    viewProductDetails();
});

function editRow() {

    let storedArray = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < storedArray.length; i++) {

        // let storeArray = JSON.parse(JSON.stringify(storedArray[]))
        if (this.id == storedArray[i].id) {
            $("#Editform input[name='id']").val(storedArray[i].id);
            $("#Editform input[name='name']").val(storedArray[i].name);
            $("#Editform input[name='price']").val(storedArray[i].price);
            $("#Editform input[name='description']").val(storedArray[i].description);
            $("#Editform input[name='quantity']").val(storedArray[i].quantity);
        }
    }
    $("#editModal").modal("show");

}

let up = document.getElementById('up');
up.addEventListener("click", updateRow);

function updateRow() {

    let id = document.querySelector("#id").value;
    let storedArray = JSON.parse(localStorage['products']);

    for (let i = 0; i < storedArray.length; i++) {
        if (id == storedArray[i].id) {

            storedArray[i].name = document.querySelector("#EditProductName").value;
            storedArray[i].quantity = document.querySelector("#EditProductQuantity").value;
            storedArray[i].price = document.querySelector("#EditProductPrice").value;
            storedArray[i].description = document.querySelector("#EditProductDescription").value;
            console.log(id);
            break;
        }


    }
    localStorage.setItem("products", JSON.stringify(storedArray));

}
