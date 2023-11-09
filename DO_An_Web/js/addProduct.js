let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

//checknig user is logged in or not
window.onload = () =>{
    if(user){
        if (!compareToken(user.authToken, user.email)){
            location.replace('/login');
        }
    } else{
        location.replace('/login');
    }
}
//price inputs

const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

discountPercentage.addEventListener('input', () =>{
    if(discountPercentage.value > 100){
        discountPercentage.value = 90;
    }else{
        let discount = actualPrice.value * discountPercentage.value /100;
        sellingPrice.value = actualPrice.value - discount;
    }
})

sellingPrice.addEventListener('input',() =>{
    let discount = (sellingPrice.value / actualPrice.value) * 100;
    discountPercentage.value = discount;
}) 

// upload image handle
let uploadImages = document.querySelectorAll('.fileupload');
let imagePaths = []; //will store all uploaded images paths;

uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
      const file   = fileupload.files[0];
      let imageUrl;
      
      if(file.type.includes('image')){
        // means user uploaded an image
        fetch('/s3url').then(res => res.json())
        .then(url => {
            fetch(url,{
                method: 'PUT',
                headers: new Headers({'Content-Type': multipart/form-data}),
                body:file
            }).then(res => {
                imageUrl = url.split("?")[0];
                imagePaths[index] = imageUrl;
               let label = document.querySelector('label[for=${fileupload.id}]');
               label.style.backgroundImage = 'url(${imageUrl})';
               let productImage = document.querySelector('.product-image');
               productImage.style.backgroundImage = 'url(${imageUrl})';
            })
        })
      }else{
        showAlert('upload image only');
      }
    })
})

//form submission

const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#des');

let sizes = []; //will store all the sizes

const stock = document.querySelector('#stock');
const tags = document.querySelector('#tags');
const tac = document.querySelector('#tac');

//buttons
const addProductBtn = document.querySelector('#add-btn');
const saveDraft = document.querySelector('#save-btn');


//store size function
const storeSizes = () => {
    sizes = [];
    let sizeCheckBox = document.querySelector('.size-checkbox');
    sizeCheckBox.forEach(item => {
        if(item.checked){
            sizes.push(item.value)
        }  
    })
}

const validateForm = () => {
    if (!productName.value.length){
        showAlert('enter product name')
    }
}

addProductBtn.addEventListener('click', () => {
    storeSizes();
    //validate form
    if(validateForm()){  //validateForm return true or false while doing validation

    }
})
