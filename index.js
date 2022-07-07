// -------------get dữ liệu từ API khi chạy trang------
function getProductsList() {
  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetAll",
    method: "GET",
  });
  promise.then(function (result) {
    console.log(result.data);
    renderTable(result.data);
  });
}

// ----------RENDER TABLE FUNCTION--------------
function renderTable(data) {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    let currentProd = data[i];
    html += `
    <tr>
    <td>${currentProd.id}</td>
    <td><img src="${currentProd.img}" style="width:100px"></td>
    <td>${currentProd.name}</td>
    <td>${currentProd.price}</td>
    <td>${currentProd.description}</td>
    <td>${currentProd.type}</td>
    <td>
    <button class="btn btn-danger" onclick="deleteProd('${currentProd.id}')"><i class="fa fa-trash"></i></button>
    <a href = "#form"><button class="btn btn-warning" onclick ="updateProd('${currentProd.id}')"><i class="fa fa-pencil" style="color:white"></i></button></a>
    </td>
    </tr>
    `;
  }
  document.querySelector("#tbodyProduct").innerHTML = html;
}
// ------------CREATE FUNCTION-------------
document.getElementById("createButton").onclick = async function creatProd() {
  var newProd = new Product();
  newProd["id"] = document.getElementById("id").value;
  newProd["name"] = document.getElementById("name").value;
  newProd["price"] = document.getElementById("price").value;
  newProd["img"] = document.getElementById("img").value;
  newProd["type"] = document.getElementById("type").value;
  newProd["description"] = document.getElementById("description").value;
  /*thông báo thêm thành công hoặc thất bại*/
  let mess = "";
  try {
    let result = await axios({
      url: "http://svcy.myclass.vn/api/Product/CreateProduct",
      method: "POST",
      data: newProd,
    });
    mess = result.data;
    alert("thêm thành công");
    getProductsList();
  } catch (err) {
    alert(err.respones?.data);
  }
};
//   let promise = axios({
//     url: "http://svcy.myclass.vn/api/Product/CreateProduct",
//     method: "POST",
//     data: newProd,
//   });
//   promise.then(function (result) {
//     console.log(result);
//     alert("Create Success!")
//   });
//   promise.catch(function (err) {
//     console.log("err", err);
//   });
//   getProductsList();
// };

// ---------DELETE FUNCTION---------
function deleteProd(idProdClick) {
  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/DeleteProduct/" + idProdClick,
    method: "DELETE",
  });
  promise.then(function (result) {
    console.log(result.data);
    getProductsList();
  });
  promise.catch(function (err) {
    console.log(err);
  });
  alert("Delete completed");
}
// -----------UPDATE FUNCTION------------
function updateProd(idProdClick) {
  document.getElementById("updateButton").style.display = "inline-block";
  document.getElementById("createButton").style.display = "none";
  document.getElementById("id").disabled = true;

  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetById/" + idProdClick,
    method: "GET",
  });
  promise.then(function (result) {
    console.log(result.data);
    let currentProd = result.data;
    document.getElementById("id").value = currentProd.id;
    document.getElementById("name").value = currentProd.name;
    document.getElementById("img").value = currentProd.img;
    document.getElementById("type").value = currentProd.type;
    document.getElementById("price").value = currentProd.price;
    document.getElementById("description").value = currentProd.description;
  });
  promise.catch(function (err) {
    console.log("err", err);
  });
  // console.log("hello")
}
// sau khi chỉnh form input bấm confirm update
function confirmUpdate() {
  // new prototype cho các chức năng Create và Update cái giá trị đã fix lên API. Vì bản chất tạo mới/fix lại mới thì sẽ tạo ra 1 object mới nên vì thế phải new prototype. Tương tự, ta chỉ truyền data là object vào axios cũng chỉ cho 2 chức năng là tạo và update-lưu !!!
  let updateProd = new Product();
  updateProd.id = document.getElementById("id").value;
  updateProd.name = document.getElementById("name").value;
  updateProd.img = document.getElementById("img").value;
  updateProd.type = document.getElementById("type").value;
  updateProd.price = document.getElementById("price").value;
  updateProd.description = document.getElementById("description").value;
  console.log("nqwwe", updateProd);

  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/UpdateProduct/" + updateProd.id,
    method: "PUT",
    data: updateProd,
  });
  promise.then(function (result) {
    // console.log("hello", result.data);
    getProductsList();/*gọi getProductList vì lúc này API đã nhận object mới được update đẩy lên nên get api về (trong api có chạy luôn render table r nên sẽ xuất ra bảng*/
    cancel(); /*f5 lại trang */
    alert("Update successfully");
  });
  promise.catch(function (err) {
    console.log("err", err);
  });
}
//-------------------------------SEARCH BY NAME FUNCTION-------------------------
// --------CANCEL BTN-----------
function cancel() {
  location.reload();
}
// -------------ONLOAD-------------------
window.onload = function () {
  getProductsList();
  document.getElementById("updateButton").style.display = "none";
};
