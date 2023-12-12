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

if(localStorage["subscribers"] != undefined){
    subscribers = JSON.parse(localStorage["subscribers"]);
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

btnSubscribe.addEventListener("click", ()=>{
    const inpFname = document.getElementById("footer-form-Fname").value;
    const inpLname = document.getElementById("footer-form-Lname").value;
    const inpMail = document.getElementById("footer-form-mail").value;
    sub(inpFname, inpLname, inpMail);
    document.getElementById("footer-form-Fname").value = "";
    document.getElementById("footer-form-Lname").value = "";
    document.getElementById("footer-form-mail").value = "";
    document.getElementById("subscribe-modal").close();
})

//setting a new subscriber

function sub(fName, lName, eMail){
    let newSub = {firstName: fName, lastName: lName, eMail: eMail};
    subscribers.push(newSub);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
};
