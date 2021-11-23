const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const popup_body = document.querySelector(".popup__body");
const popContent = document.querySelector(".popup__content ");

const formContainer = document.querySelector(".popup__form");
const form = document.querySelector("form");

const signUpButton = document.querySelector(".signup_button");
const logInButton = document.querySelector(".login");

const signup = document.querySelector(".create_account");
const login = document.querySelector(".log_in");

const containers = document.querySelectorAll(".input_container");
const inputName = document.querySelector(".name_container");
const check = document.querySelector(".checkbox_container");
const google = document.querySelector(".google_text");
const fb = document.querySelector(".facebook_text");
const inputs = document.querySelectorAll(".input");
const inputsLogIn = document.querySelectorAll(".login_input");
const namee = document.querySelector(".input_name");
const email = document.querySelector(".input_email");
const password = document.querySelector(".input_password");
const checkbox = document.querySelector(".input_checkbox");
const btn = document.querySelector(".popup__button");
const user = document.querySelector(".user");
const userName = document.querySelector(".user_name");
const user_icon = document.querySelector(".user i");
const logout = document.querySelector(".log_out");
const close = document.querySelector(".log_out i");
 
const carousel = document.querySelector(".pets_carousel");
 const content = document.querySelector(".pets_photos");
 const next = document.querySelector(".switch_right");
 const prev = document.querySelector(".switch_left");


 let direction = 0;

 next.addEventListener("click", () => {
   direction = -1;
   const petWidth = document.querySelector(".pets_photos a ").offsetWidth;
   
   if(document.documentElement.clientWidth <= 581) {
    content.style.transform = `translateY(-${petWidth + 65}px)`;
   }else {
    content.style.transform = `translateX(-${petWidth}px)`;
  }
 });

 prev.addEventListener("click", () => {
  direction = 1;
  const petWidth = document.querySelector(".pets_photos a ").offsetWidth;
   
  if(document.documentElement.clientWidth <= 581) {
    content.style.transform = `translateY(${petWidth + 65}px)`;
   }else {
    content.style.transform = `translateX(${petWidth}px)`;
  }
 });


 content.addEventListener("transitionend", () => {
     if(direction === -1) {
      content.appendChild(content.firstElementChild);
     }else if(direction === 1){
      content.prepend(content.lastElementChild);
     }
    
   content.style.transition = "none";
   content.style.transform = "translate(0)";
   setTimeout(function() {
    content.style.transition = "all 0.5s";
   })
 });


let nameValue = '';

signUpButton.addEventListener("click", handleClick);
logInButton.addEventListener("click", handleClick);

signup.addEventListener("click", switchToSignUp);
login.addEventListener("click", switchToLogin);

const buttons = document.querySelectorAll(".signup_buttons .signup__button").forEach(el => {
  el.addEventListener("click", handleSocialMediaClick);
});

user_icon.addEventListener("click", (e) => {
  logout.classList.toggle("log_out_active");
});

close.addEventListener("click", (e) => {
  signUpButton.style.display = "block";
  logInButton.style.display = "block";
  user.classList.remove("logged_in");
  logout.classList.remove("log_out_active");
  nameValue = "";
})

btn.addEventListener("click", (e) => {
  e.preventDefault();
  handleButtonClick(nameValue);
})

form.addEventListener("input", (e) => {
  e.preventDefault();

  let disabled = false;

  if (signup.classList.contains("active_mode")) {
    inputs.forEach(input => {
      console.log(input.value);
      console.log(validateDate(input));
      
      if(input.type === "checkbox") {
        if (input.checked !== true) {
         disabled = true;
        } 
      }else{
        if (
          input.value === "" ||
          !input.value.replace(/\s/g, "").length ||
          validateDate(input) === false
        ) {
          disabled = true;
        }
      }
    });
  }

  if (login.classList.contains("active_mode")) {
    inputsLogIn.forEach(input => {
      console.log(input.value);
      console.log(validateDate(input));
      if (
        input.value === "" ||
        !input.value.replace(/\s/g, "").length ||
        validateDate(input) === false
      ) {
        disabled = true;
      }
    });
  }

  if (disabled) {
    btn.setAttribute("disabled", "disabled");
  } else {
    btn.removeAttribute("disabled");
  }
});

popup_body.addEventListener("click", () => {
 closePopup();
});

function handleClick(event) {
  event.preventDefault();
  if(event.target.textContent === "Sign up"){
    switchToSignUp();
  }else {
    switchToLogin();
  } 
 openPopup();
}

function switchToLogin() {
  formContainer.style.flex = " 0 0 300px";
  form.style.flex = "0 0 250px";
  popContent.style.height = "524px";

  google.textContent = "Google Login";
  fb.textContent = "Facebook Login";

  check.style.display = "none";
  inputName.style.display = "none";

  signup.classList.remove("active_mode");
  login.classList.add("active_mode");
}

function switchToSignUp() {
  check.style.display = "block";
  inputName.style.display = "flex";

  formContainer.style.flex = null;
  form.style.flex = null;
  popContent.style.height = null;

  google.textContent = "Google Sign up";
  fb.textContent = "Facebook Sign up";

  login.classList.remove("active_mode");
  signup.classList.add("active_mode");
}

function openPopup(){
  popup.classList.add("open");
  btn.setAttribute("disabled", "disabled");
  document.body.style.position = "fixed";
  document.body.style.top = `-${window.scrollY}px`;
}

function validateDate(input) {
  let validated = false;

  if (input.type === "text") {
    if (input.value.trim() !== "") {
      isSuccess(input);
      nameValue = input.value.trim();
      validated = true;
      return validated;
    } else {
      isError(input, "Name cannot be blank");
      return false;
    }
  } else if (input.type === "email" && input.value !== "") {
    validated = isEmail(input.value.trim());
    if (validated) {
      isSuccess(input);
      return validated;
    } else {
      isError(input, "Invalid email");
      return false;
    }
  } else if (input.type === "password" && input.value !== "") {
    validated = isPassword(input.value.trim());

    if (validated) {
      isSuccess(input);
      return validated;
    } else {
      isError(input, "Invalid password");
      return false;
    }
  }  else {
    return validated;
  }
}

function isEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function isPassword(password) {
  return /[a-z]{8,}/.test(password);
}

function isSuccess(input) {
  const formControl = input.parentElement;

  if (formControl.classList.contains("error")) {
    formControl.classList.remove("error");
  }
  formControl.classList.add("success");
}

function isError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  
  if (formControl.classList.contains("success")) {
    formControl.classList.remove("success");
  }

  small.textContent = message;
  formControl.classList.add("error");
}


function closePopup () {
  popup.classList.remove("open");

  const scrollY = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);

  checkbox.checked = false;
  inputs.forEach(function (input) {
    input.value = "";
    const formControl = input.parentElement;
    if (formControl.classList.contains("error")) {
      formControl.classList.remove("error");
    }
    if (formControl.classList.contains("success")) {
      formControl.classList.remove("success");
    }
  });
  btn.removeAttribute("disabled");
}


function handleSocialMediaClick(e) {
 
  if(e.target.textContent.trim() === "Google Sign up" || e.target.textContent.trim() === "Google Login"){
    nameValue = "Logged in with Google";
    
  }else if(e.target.textContent.trim() === "Facebook Sign up" || e.target.textContent.trim() === "Facebook Login"){
    nameValue = "Logged in with Facebook";
    
  };
  handleButtonClick(nameValue);
}


function handleButtonClick(name) {
  closePopup();
  signUpButton.style.display = "none";
  logInButton.style.display = "none";
  user.classList.add("logged_in");
  userName.textContent = name !== "" ? name : "Hello, User";
}


const cardsContainer = document.querySelector(".testimonials_cards");
const cards_slide = document.querySelector(".card__slider");



let scheduled = null;
window.addEventListener("load", switchSlides);

const slides = document.querySelectorAll(".card ").forEach(slide => {
  slide.addEventListener("click", function() {
  clearInterval(scheduled);
  scheduled = setTimeout(function(){
   switchSlides();
     }, 30000);
    })
});

function carouselTurn () {
  const cardWidth = document.querySelector(".card ").offsetWidth + 15;
  cards_slide.style.transform = `translateX(-${cardWidth}px)`;
}



function switchSlides () {
  scheduled = setInterval(function(){
    carouselTurn();
  }, 10000);
}


 cards_slide.addEventListener("transitionend", () => {
 
cards_slide.appendChild(cards_slide.firstElementChild);

cards_slide.style.transition = "none";
cards_slide.style.transform = "translate(0)";

setInterval(function(){
  cards_slide.style.transition = "all 0.8s ease-in-out";
}, 500);
});




