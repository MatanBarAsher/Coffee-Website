import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

//items modal

const openModal = document.querySelectorAll(".prod-a");
const closeModal= document.querySelectorAll(".close-modal");

const stepFaders = document.querySelectorAll(".fade-in-step");

const btnSubscirbeOpn = document.getElementById("footer-form-subscribe");
const btnSubscirbeCls = document.getElementById("close-modal4");
const btnSubscribe = document.getElementById("btn-subscribe");
var subscribers = [];
document.querySelector("body").addEventListener("load", init());

function init(){
if(localStorage["subscribers"] != undefined){
    subscribers = JSON.parse(localStorage["subscribers"]);
}
else
{
    subscribers=[];
}
}
//setting click events for modals

for (let index = 0; index < openModal.length; index++) {
    const clk = "#modal" + (index + 1);

    openModal[index].addEventListener("click", () =>{
        document.querySelector(clk).showModal();
    })

    closeModal[index].addEventListener("click", () =>{
        document.querySelector(clk).close();
    })
}


//steps transition animations

const apearOptions = {
    threshold: 0,
    rootMargin:"0px 0px -100px 0px"
};

const apearOnScroll = new IntersectionObserver
(function(step, apearOnScroll) {
    step.forEach(stp =>{
        if(!stp.isIntersecting)
            return;
        else{
            stp.target.classList.add("apear");
            apearOnScroll.unobserve(stp.target);
        }
    })

     
}, apearOptions);

stepFaders.forEach(fader =>{
    apearOnScroll.observe(fader);
});

//click event for subscribe modal

btnSubscirbeOpn.addEventListener("click",()=>{
    document.getElementById("subscribe-modal").showModal();
});

btnSubscirbeCls.addEventListener("click", ()=>{
    document.getElementById("subscribe-modal").close();
})

var openedWindow;
btnSubscribe.addEventListener("click", ()=>{
    const inpFname = document.getElementById("footer-form-Fname").value;
    const inpLname = document.getElementById("footer-form-Lname").value;
    const inpMail = document.getElementById("footer-form-mail").value;
    if(firstNameCheck(inpFname) && lastNameCheck(inpLname) && ValidateEmail(inpMail)){
        sub(inpFname, inpLname, inpMail);
        document.getElementById("footer-form-Fname").value = "";
        document.getElementById("footer-form-Lname").value = "";
        document.getElementById("footer-form-mail").value = "";
        document.getElementById("subscribe-modal").close();
    }
    if(openedWindow === undefined){
        // there is no open 'subscribers' tab
        openedWindow = window.open("subscribers.html","_blank");
    }
    else{
        openedWindow.location.reload();
        openedWindow.focus();
    }
})

//email checking

function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.match(mailformat))
{
return true;
}
else
{
alert("You have entered an invalid email address!");
return false;
}
}

//checking names

function firstNameCheck(inputText){
    if(inputText !== "")
    return true;
else{
    alert("First name not enterd");
    return false;
}
}

function lastNameCheck(inputText){
    if(inputText !== "")
    return true;
else{
    alert("Last name not enterd");
    return false;
}
}

//setting a new subscriber

function sub(fName, lName, eMail){
    init();
    //console.log(subscribers[subscribers.length -1].id);
    if(subscribers.length !== 0){
        var newId = (subscribers[subscribers.length -1].id +1);
    }
    else{
        var newId = 1;
    }
    let newSub = {id: newId ,firstName: fName, lastName: lName, eMail: eMail};
    subscribers.push(newSub);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
};
