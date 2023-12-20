//js file for subscribers page

    var subscribers = [];
    var filterdSubscribers = [];
    const subList = document.getElementById("sub-list");
    const mainField = document.getElementById("main");
    const subscribersCount = document.createElement('p');
    document.querySelector("body").addEventListener("load", init());

    function init(){
        if(localStorage["subscribers"] != undefined){
            subscribers = JSON.parse(localStorage["subscribers"]);
        }
        
        renderSubs(false);
        mainField.prepend(subscribersCount);
        subscribersCount.innerText = `Total subscribers: ${subscribers.length}`;
            console.log(subscribers);

    }
    
    function renderSubs(isFilterd){
        str = "";
        if(isFilterd === false){
            subscribers.forEach(element => {
            let index = subscribers.indexOf(element)
            str += `<li><button value=${index} class="btn-remove">remove</button><br><b>id:</b> ${element["id"]}<br><b>First name:</b> ${element["firstName"]}<br><b>Last Name:</b> ${element["lastName"]}<br><b>E-mail:</b> ${element["eMail"]}</li>`;
        });
        subscribersCount.innerText = `Total subscribers: ${subscribers.length}`;
    }
    else{
            filterdSubscribers.forEach(element => {
            let index = filterdSubscribers.indexOf(element)
            str += `<li><button value=${index} class="btn-remove">remove</button><br><b>id:</b> ${element["id"]}<br><b>First name:</b> ${element["firstName"]}<br><b>Last Name:</b> ${element["lastName"]}<br><b>E-mail:</b> ${element["eMail"]}</li>`;
        });
        subscribersCount.innerText = `Total subscribers: ${filterdSubscribers.length}`;
        }
        subList.innerHTML = str;
    }
    
    //removing subscriber

    const btnRemove = document.querySelectorAll(".btn-remove");
    btnRemove.forEach(element => {
        element.addEventListener("click",  function(element){
            subList.removeChild(element.target.parentNode);
            subscribers.splice(element.target.value,1)
            //filterdSubscribers.splice(element.target.value,1)
            localStorage.setItem("subscribers", JSON.stringify(subscribers));
            location.reload();
         });
    });
    
    // searching subscriber

    const searchBox = document.createElement('input');
    searchBox.id = "search-box";
    searchBox.placeholder = "Search...";
    searchBox.style = "font-family: 'Poppins';";
    mainField.prepend(searchBox);

    //search box evets

    searchBox.addEventListener("keyup", ()=>{
        filterdSubscribers = [];
        let tempStr = searchBox.value;
        if(tempStr !== ""){
            serchStr(tempStr);
        }
        else{
            renderSubs(false);
        }
        console.log(btnRemove);
    });

    function serchStr(str){
        subscribers.forEach(sub => {
            let check = subscribersContain(sub, str);
            if(subscribersContain(sub, str)){
                filterdSubscribers.push(sub);
            }
        })
        renderSubs(true);
    }
   
    function subscribersContain(sub, str){
        if(
            sub.firstName.includes(str)
            || 
            sub.lastName.includes(str)
            || 
            sub.eMail.includes(str)
        ){
            return true;
        }
        else{
            return false;
        }
    }