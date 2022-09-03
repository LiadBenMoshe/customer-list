var customerArray = [];

if (localStorage.getItem("test")) {
  customerArray = JSON.parse(localStorage.getItem("test"));
} else {
  // No data, start with an empty array
  customerArray = [];
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let nameValue = document.getElementById("validationServer01").value;
    let emailValue = document.getElementById("validationCustom02").value;
    let phoneValue = document.getElementById("validationCustom03").value;
    customerArray.push({
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
    });
    localStorage.setItem("test", JSON.stringify(customerArray));
    document.getElementById("myAlert").style.display = "";
    setTimeout(function () {
      document.getElementById("myAlert").style.display = "none";
    }, 1000);
  });

  const printCustomerButton = document.getElementById("printCustomer");
  printCustomerButton.addEventListener("click", function () {
    createTable(customerArray);
  });

  const printCustomerPDFButton = document.getElementById("printCustomerPDF");
  printCustomerPDFButton.addEventListener("click", function () {
    if (document.getElementById("box").innerHTML != null) {
      createPDF();
    }
  });

  const deleteCustomerButton = document.getElementById("deleteCustomers");
  deleteCustomerButton.addEventListener("click", function () {
    cleanLocalStorage();
  });
});

function cleanForm() {
  document.getElementById("signup").reset();
}

function cleanLocalStorage() {
  localStorage.clear();
  customerArray = [];
}

function createTable(tableData) {
  var html = '<table class="table table-dark">';
  html += "<caption>Liad Page Customers</caption>";
  html += "<tr><th>Name</th><th>Phone</th><th>Email</th></tr>";
  for (var i = 0; i < tableData.length; i++) {
    html += "<tr>";
    html += "<td>" + tableData[i].name + "</td>";
    html += "<td>" + tableData[i].phone + "</td>";
    html += "<td>" + tableData[i].email + "</td>";
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("box").innerHTML = html;
}

function createPDF() {
  var sTable = document.getElementById("box").innerHTML;

  var style = "<style>";
  style = style + "table {width: 100%;font: 17px Calibri;}";
  style =
    style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
  style = style + "padding: 2px 3px;text-align: center;}";
  style = style + "</style>";

  // CREATE A WINDOW OBJECT.
  var win = window.open("", "", "height=700,width=700");

  win.document.write("<html><head>");
  win.document.write("<title>My Customers</title>"); // <title> FOR PDF HEADER.
  win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
  win.document.write("</head>");
  win.document.write("<body>");
  win.document.write(sTable); // THE TABLE CONTENTS INSIDE THE BODY TAG.
  win.document.write("</body></html>");

  win.document.close(); // CLOSE THE CURRENT WINDOW.

  win.print(); // PRINT THE CONTENTS.
}
