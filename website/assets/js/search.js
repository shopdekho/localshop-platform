/*
=========================================================
Project : LocalShop
File    : search.js
Part    : 1
=========================================================
*/

'use strict';


/* ======================================================
DOM
====================================================== */

const searchInput =
document.querySelector(".search-box input");

const resultCards =
document.querySelectorAll(".result-card");

const recentList =
document.querySelector(".recent-list");

const emptyState =
document.querySelector(".empty-search");

const filterSheet =
document.getElementById("filterSheet");

const loader =
document.getElementById("loader");

const toastContainer =
document.getElementById("toastContainer");

const filterButton =
document.querySelectorAll(".action-card")[2];

const nearButton =
document.querySelectorAll(".action-card")[1];

const qrButton =
document.querySelectorAll(".action-card")[0];



/* ======================================================
CONFIG
====================================================== */

const STORAGE_KEY =
"localshop_recent_search";

const MAX_HISTORY =
8;



/* ======================================================
START
====================================================== */

document.addEventListener(
"DOMContentLoaded",
initSearchPage
);



function initSearchPage(){

    loadHistory();

    bindEvents();

    animateCards();

}



/* ======================================================
EVENTS
====================================================== */

function bindEvents(){

    if(searchInput){

        searchInput.addEventListener(

            "input",

            debounce(searchShop,250)

        );

    }

    if(filterButton){

        filterButton.addEventListener(

            "click",

            openFilterSheet

        );

    }

    if(nearButton){

        nearButton.addEventListener(

            "click",

            findNearbyShops

        );

    }

    if(qrButton){

        qrButton.addEventListener(

            "click",

            openQRScanner

        );

    }

    document.addEventListener(

        "click",

        outsideFilterClose

    );

}



/* ======================================================
LIVE SEARCH
====================================================== */

function searchShop(){

    const keyword =

    searchInput.value

    .trim()

    .toLowerCase();

    let visible = 0;

    resultCards.forEach(card=>{

        const text =

        card.innerText.toLowerCase();

        if(text.includes(keyword)){

            card.style.display="block";

            visible++;

        }

        else{

            card.style.display="none";

        }

    });

    if(keyword.length>1){

        saveHistory(keyword);

    }

    toggleEmptyState(visible);

}



/* ======================================================
EMPTY STATE
====================================================== */

function toggleEmptyState(count){

    if(!emptyState) return;

    if(count===0){

        emptyState.classList.remove("hidden");

    }

    else{

        emptyState.classList.add("hidden");

    }

}



/* ======================================================
SEARCH HISTORY
====================================================== */

function loadHistory(){

    if(!recentList) return;

    const history =

    JSON.parse(

    localStorage.getItem(

    STORAGE_KEY

    ) || "[]"

    );

    if(history.length===0) return;

    recentList.innerHTML="";

    history.forEach(item=>{

        const a =

        document.createElement("a");

        a.href="#";

        a.innerHTML=`

        <i class="fa-solid fa-clock-rotate-left"></i>

        ${item}

        `;

        a.onclick=(e)=>{

            e.preventDefault();

            searchInput.value=item;

            searchShop();

        };

        recentList.appendChild(a);

    });

}



/* ======================================================
SAVE HISTORY
====================================================== */

function saveHistory(value){

    let history=

    JSON.parse(

    localStorage.getItem(

    STORAGE_KEY

    ) || "[]"

    );

    history=

    history.filter(

    x=>x!==value

    );

    history.unshift(value);

    history=

    history.slice(0,MAX_HISTORY);

    localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(history)

    );

}



/* ======================================================
FILTER
====================================================== */

function openFilterSheet(){

    if(!filterSheet) return;

    filterSheet.classList.add(

        "active"

    );

}



function closeFilterSheet(){

    if(!filterSheet) return;

    filterSheet.classList.remove(

        "active"

    );

}



function outsideFilterClose(e){

    if(

    !filterSheet ||

    !filterSheet.classList.contains("active")

    ) return;

    if(

    !filterSheet.contains(e.target)

    &&

    !e.target.closest(".action-card")

    ){

        closeFilterSheet();

    }

}



/* ======================================================
LOADER
====================================================== */

function showLoader(){

    if(loader)

    loader.style.display="flex";

}



function hideLoader(){

    if(loader)

    loader.style.display="none";

}



/* ======================================================
CARD ANIMATION
====================================================== */

function animateCards(){

    resultCards.forEach(

    (card,index)=>{

        card.style.opacity="0";

        card.style.transform=

        "translateY(25px)";

        setTimeout(()=>{

            card.style.transition=

            ".45s";

            card.style.opacity="1";

            card.style.transform=

            "translateY(0)";

        },index*90);

    });

}


/* ======================================================
VOICE SEARCH
====================================================== */

function startVoiceSearch(){

    if(

        !("webkitSpeechRecognition" in window)

        &&

        !("SpeechRecognition" in window)

    ){

        showToast(

            "Voice Search not supported.",

            "warning"

        );

        return;

    }

    const SpeechRecognition =

        window.SpeechRecognition ||

        window.webkitSpeechRecognition;

    const recognition =

        new SpeechRecognition();

    recognition.lang="en-IN";

    recognition.interimResults=false;

    recognition.maxAlternatives=1;

    recognition.start();

    showToast(

        "Listening...",

        "success"

    );

    recognition.onresult=(event)=>{

        const text=

        event.results[0][0].transcript;

        searchInput.value=text;

        searchShop();

        showToast(

            "Voice search completed.",

            "success"

        );

    };

    recognition.onerror=()=>{

        showToast(

            "Voice search failed.",

            "error"

        );

    };

}



/* ======================================================
VOICE BUTTON
====================================================== */

const voiceButton=

document.querySelector(

".search-box button"

);

if(voiceButton){

    voiceButton.addEventListener(

        "click",

        startVoiceSearch

    );

}



/* ======================================================
NEARBY SHOP
====================================================== */

function findNearbyShops(){

    if(

        !navigator.geolocation

    ){

        showToast(

            "Location not supported.",

            "error"

        );

        return;

    }

    showLoader();

    navigator.geolocation.getCurrentPosition(

        (position)=>{

            hideLoader();

            console.log(

                position.coords.latitude,

                position.coords.longitude

            );

            showToast(

                "Nearby shops loaded.",

                "success"

            );

            /*
            Future API

            API.searchNearby(
                lat,
                lng
            );

            */

        },

        ()=>{

            hideLoader();

            showToast(

                "Location permission denied.",

                "error"

            );

        }

    );

}



/* ======================================================
QR SCANNER
====================================================== */

function openQRScanner(){

    showToast(

        "QR Scanner coming soon.",

        "warning"

    );

    /*
        Future

        location.href="/website/scan";

    */

}



/* ======================================================
TOAST
====================================================== */

function showToast(

    message,

    type="success"

){

    if(

        !toastContainer

    ) return;

    const toast=

    document.createElement(

        "div"

    );

    toast.className=

    "toast toast-"+type;

    let icon=

    "fa-circle-check";

    if(type==="error"){

        icon="fa-circle-xmark";

    }

    if(type==="warning"){

        icon="fa-triangle-exclamation";

    }

    toast.innerHTML=`

    <i class="fa-solid ${icon}"></i>

    <span>${message}</span>

    `;

    toastContainer.appendChild(

        toast

    );

    setTimeout(()=>{

        toast.remove();

    },3000);

}



/* ======================================================
BUTTON RIPPLE
====================================================== */

document

.querySelectorAll(

".btn"

)

.forEach(btn=>{

    btn.addEventListener(

        "click",

        rippleEffect

    );

});

function rippleEffect(e){

    const circle=

    document.createElement(

        "span"

    );

    const size=

    Math.max(

        this.clientWidth,

        this.clientHeight

    );

    circle.style.width=size+"px";

    circle.style.height=size+"px";

    circle.style.left=

    e.offsetX-size/2+"px";

    circle.style.top=

    e.offsetY-size/2+"px";

    circle.className=

    "ripple";

    this.appendChild(circle);

    setTimeout(()=>{

        circle.remove();

    },600);

}



/* ======================================================
OPEN SHOP
====================================================== */

document

.querySelectorAll(

".btn-primary"

)

.forEach(btn=>{

    btn.addEventListener(

        "click",

        function(){

            const card=

            this.closest(

            ".result-card"

            );

            if(!card) return;

            const name=

            card.querySelector(

            "h3"

            ).innerText;

            showLoader();

            setTimeout(()=>{

                hideLoader();

                console.log(

                    "Open Shop :",

                    name

                );

                /*
                Future

                location.href=

                "/website/shop?id="+id;

                */

            },500);

        }

    );

});



/* ======================================================
DETAIL BUTTON
====================================================== */

document

.querySelectorAll(

".btn-outline"

)

.forEach(btn=>{

    btn.addEventListener(

        "click",

        function(){

            const card=

            this.closest(

            ".result-card"

            );

            const shop=

            card.querySelector(

            "h3"

            ).innerText;

            showToast(

                shop,

                "success"

            );

        }

    );

});



/* ======================================================
UTILITY
====================================================== */

function debounce(

    func,

    delay

){

    let timer;

    return function(){

        clearTimeout(

            timer

        );

        timer=setTimeout(

            ()=>{

                func.apply(

                    this,

                    arguments

                );

            },

            delay

        );

    };

}



/* ======================================================
PAGE ANIMATION
====================================================== */

window.addEventListener(

    "load",

    ()=>{

        document.body.classList.add(

            "fade-up"

        );

    }

);



/* ======================================================
FUTURE API

API.search()

API.searchNearby()

API.searchCategory()

API.getShop()

API.getOffer()

====================================================== */



/* ======================================================
END OF search.js
Version : 1.0
====================================================== */
