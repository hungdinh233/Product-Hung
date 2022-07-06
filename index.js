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

// ----------render ra bảng--------------
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
    <button class="btn btn-warning"><i class="fa fa-pencil" style="color:white"></i></button>
    </td>
    </tr>
    `;
  }
  document.querySelector("#tbodyProduct").innerHTML = html;
}
// ------------create-------------
var prodList = [];
document.getElementById("createButton").onclick = function creatProd() {
  var newProd = new Product();
  newProd["id"] = document.getElementById("id").value;
  newProd["name"] = document.getElementById("name").value;
  newProd["price"] = document.getElementById("price").value;
  newProd["img"] = document.getElementById("img").value;
  newProd["type"] = document.getElementById("type").value;
  newProd["description"] = document.getElementById("description").value;
  /*thông báo thêm thành công hoặc thất bại*/
  let mess = "";
  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/CreateProduct",
    method: "POST",
    data: newProd,
  });
  promise.then(function (result) {
    console.log(result);
  });
  promise.catch(function(err){
    console.log("err", err)
  })
  getProductsList();

}

// ---------Delete---------
function deleteProd(idProdClick){
  let promise= axios({
    url:"http://svcy.myclass.vn/api/Product/DeleteProduct/" + idProdClick,
    method: "DELETE"
  })
  promise.then(function(result){
    getProductsList();
  });
  Promise.catch(function(err){
    console.log (err);
    alert("Delete completed")
  })
}

 window.onload = function () {
  getProductsList();
};
