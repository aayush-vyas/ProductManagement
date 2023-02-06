

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

        let nameCell = document.createElement("td");

        nameCell.textContent = id_count;
        row.appendChild(nameCell);
        id_count++;
        let priceCell = document.createElement("td");
        priceCell.textContent = obj.name;
        row.appendChild(priceCell);

        let quantityCell = document.createElement("td");
        quantityCell.textContent = obj.quantity;
        row.appendChild(quantityCell);

        let descriptionCell1 = document.createElement("td");
        descriptionCell1.textContent = obj.price;
        row.appendChild(descriptionCell1);

        let descriptionCell2 = document.createElement("td");
        descriptionCell2.textContent = obj.description;
        row.appendChild(descriptionCell2);

        let totalCell = document.createElement("td");
        let total = obj.price * obj.quantity;
        totalCell.textContent = total;

        row.appendChild(totalCell);
        let cell = document.createElement("td");
        row.appendChild(cell)

        let descriptionCell4 = document.createElement("button");
        descriptionCell4.textContent = "Edit";
        descriptionCell4.id = obj.id;
        row.appendChild(descriptionCell4);
        // descriptionCell4.onclick = editRow();


        row.appendChild(cell);
        let descriptionCell5 = document.createElement("button");
        descriptionCell5.textContent = "Delete";
        descriptionCell5.id = obj.id;

        descriptionCell5.onclick = deleteRow;
        cell.appendChild(descriptionCell5);

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

}