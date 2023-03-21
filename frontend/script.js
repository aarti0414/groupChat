let signup1 = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");


const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const button = document.querySelector('.signup');
const form = document.querySelector('.form-section');

signup1.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
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
    // .catch(err => showError(err));
  }
}

function showError(err) {
  document.body.innerHTML += `<div style:'color:red;'>${err}</div>`;
  // alert('email already exits');
}
