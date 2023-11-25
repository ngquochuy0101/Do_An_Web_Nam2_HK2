const createNav = () => {
  const navbar = document.querySelector(".navbar");

  navbar.innerHTML = `
  <div class="nav">
  <a href="index-user.html"><img src="img/dark-logo.png" class="brand-logo" alt=""></a>
  <div class="nav-items">
      <div class="search">
          <input type="text" id= "search-box"class="search-box" placeholder="Tìm kiếm sản phẩm" value="">
          <button class="search-btn" >Tìm</button>
          <a>
          <img src="img/user.png" id="user-img" alt="">
          <div class="login-logout-popup hide">
          <p class="account-info"></p>
          <p id="user-info"></p>
          <button class="btn" id="user-btn">Đăng xuất</button>
          </div>
          </a>

      <a href="#"><img src="img/cart.png" alt=""></a>
      </div>
  </div>
</div>
<ul class="Links-container">
  <li class="link"><a href="index-user.html" style="text-decoration: none; color: #383838;">Home</a></li>
  <li id="adidas"class="link">Adidas</li>
  <li id="gucci"class="link">Gucci</li>
  <li id="nike" class="link">Nike</li>
  <li id="chanel" class="link">Chanel</li>
  <li id="louisvuitton" class="link">Louis Vuitton</li>
 
</ul>
    
    `;
};

createNav();

document.querySelector(".search-btn").addEventListener("click", function () {
  const searchValue = document.querySelector(".search-box").value;
  window.location.href =
    "search.html?search=" + encodeURIComponent(searchValue);
});

// nav popup
const userInfo = document.querySelector("#user-info");
const userImageButton = document.querySelector("#user-img");
const userPopup = document.querySelector(".login-logout-popup");
const popuptext = document.querySelector(".account-info");
const actionBtn = document.querySelector("#user-btn");
const updateBody = document.getElementById("sdt");
const user = JSON.parse(localStorage.getItem("user")) || null;
const current = JSON.parse(sessionStorage.getItem("current")) || null;
  
userImageButton.addEventListener("click", () => {
  userPopup.classList.toggle("hide");
});

window.onload = () => {
  if (current != null) {
    //means user is logged in
    popuptext.innerHTML = `Xin chào, ${current.name}`;
    userInfo.innerHTML = `<a href="#modal-two" class="btn btn-big">Thong tin nguoi dung</a>
    <a href="#" class="modal" id="modal-two" aria-hidden="true">
    </a>
    <div class="modal-dialog">
    <a href="#" class="btn-close" aria-hidden="true">×</a>

      <div class="modal-header">
        <h2>Thong tin @${current.username}</h2>
      </div>
      <div id="modal-body" class="modal-body">
        <p>Ten: ${current.name}</p>
        <div id="sdt">So dien thoai: ${current.phone}</div><button onclick="addSDT()" style="display: inline-block;">doi</button>
        <p>Dia chi: ${current.address}</p>
      </div>
      <div class="modal-footer">
        <button onClick="update()" class="btn">Thoat</button>
      </div>
    </div>`;
    actionBtn.innerHTML = "Đăng xuất";
    actionBtn.addEventListener("click", () => {
      sessionStorage.clear();
      location.reload();
    });
  } else {
    // user is logged out
    popuptext.innerHTML = "Đăng nhập để đặt hàng";
    actionBtn.innerHTML = "Đăng nhập";
    actionBtn.addEventListener("click", () => {
      location.replace("./signin.html");
    });
  }
};

function myFunction() {
  var popup = document.getElementById("update-info");
  popup.classList.toggle("show");
}

function addSDT() {
  current.phone = prompt("Nhap so dien thoai", "");
  for(let i=0; i<user.length; i++) {
    if(user[i].username == current.username) {
      user[i].phone = current.phone;
      localStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('current', JSON.stringify(current));
      updateBody.innerText = `So dien thoai: ${current.phone}`;
    }
  }
}
