let signup1 = document.querySelector(".signup");
let login1 = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");


const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const button = document.querySelector('.signup');
const loginemail = document.getElementById('loginEmail');
const loginpassword = document.getElementById('loginPassword');
const form = document.querySelector('.form-section');

signup1.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login1.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});



function signup(e) {
  e.preventDefault();
  const obj = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    password: password.value
  };
  if (!obj.name || !obj.email || !obj.phone || !obj.password) {
    alert('Enter mandatory Fields!');
  }
  else {
    axios.post('http://localhost:3000/admin/signup', obj)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          console.log('response.status: ', response.status);
          console.log('response.message: ', response.data.message);
          alert(response.data.message);
        }
      })
  }
}

function login(e) {
  console.log('inside login FE function')
  e.preventDefault();
  const obj = {
    email: loginemail.value,
    password: loginpassword.value
  };
  console.log('obj: ', obj)
  axios.post('http://localhost:3000/admin/login', obj)
    .then(response => {
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);
        document.cookie = `token=${response.data.token}`;
        window.location.href = 'chat.html'
      }
    }).catch(error => {
      console.log(error);
      if (error.response.status === 401) {
        alert('Password do not match, try again!');
        console.log('inside 401')
      }
      else if (error.response.status === 404) {
        alert(error.response.data.message);
        console.log('inside 404')
      }
    })
}
