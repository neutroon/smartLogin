// selectors
//signup selectors
const signupUsrName = document.querySelector("#signup-name");
const signupEmail = document.querySelector("#signup-email");
const signupPass = document.querySelector("#signup-pass");
const signupBtn = document.querySelector("#signup-btn");

//signin selectors
const loginEmail = document.querySelector("#login-email");
const loginPass = document.querySelector("#login-pass");
const loginBtn = document.querySelector("#login-btn");

//home selectors
const logoutBtn = document.querySelector("#logout");
const welcomeMsg = document.querySelector(".card .card-body h1");
let usrs = [];
if (localStorage.getItem("users")) {
  usrs = JSON.parse(localStorage.getItem("users"));
}

//--------------------------------------------------------------------------------------------------------------------------------------------

function addUser() {
  //check if inputs are empty
  if (
    signupUsrName.value == "" ||
    signupEmail.value == "" ||
    signupPass.value == ""
  ) {
    swal("Empty field!", "enter your email & password!", "error");
  } else {
    const obj = {
      usrName: signupUsrName.value,
      email: signupEmail.value,
      password: signupPass.value,
    };
    // check if email exist befor and bass (obj) as argu to >> (emailNotExist) function to check if it registerd befor
    if (emailNotExist(obj)) {
      usrs.push(obj);
      localStorage.setItem("users", JSON.stringify(usrs));
      clearForm();
      swal("User added succesfully!", "You can login now!", "success");
      console.log(usrs);
    } else {
      swal("Email exist before!", "Try enter new email!", "warning");
    }
  }
}

function clearForm() {
  signupUsrName.value = "";
  signupEmail.value = "";
  signupPass.value = "";
}

//--------------------------------------------------------------------------------------------------------------------------------------------

// function to check email avalibilty and return true if email not exist befor | false if email exist
let usr;
function emailNotExist(obj) {
  let emailAvalablity = true;
  for (usr of usrs) {
    if (obj.email == usr.email) {
      emailAvalablity = false;
      break;
    }
  }
  return emailAvalablity;
}

//--------------------------------------------------------------------------------------------------------------------------------------------

function login() {
  if (loginEmail.value == "" || loginPass.value == "") {
    swal("Empty field!", "enter your email & password!", "error");
  } else {
    let obj = {
      email: loginEmail.value,
      password: loginPass.value,
    }
    if (emailNotExist(obj)) {
      swal("Email not exist befor!", "signup and login again!", "error");
    } else {
      window.location.href = "./home.html";
      
      sessionStorage.setItem('name', usr.usrName)
      if(!sessionStorage.getItem('name')){
        window.location.href="./index.html";
    }
    }
  }
}

if(location.pathname.includes('/home.html')){
    if(!sessionStorage.getItem('name')){
        window.location.href="../index.html";
    }else{
        welcomeMsg.innerHTML = `welcome ${sessionStorage.getItem('name')}`;
    }
}

function logout(){
    sessionStorage.removeItem('name');
    window.location.reload();
}
