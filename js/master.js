let buttonList = document.querySelector(".toggle-menu");
let ulList = document.querySelector("header .links ul");

buttonList.onclick = function (e) {
    e.stopPropagation();
    ulList.classList.toggle("focus");
    this.classList.toggle("action");
};
document.addEventListener("click", (e) => {
    if (e.target !== buttonList && e.target !== ulList) {
        if (ulList.classList.contains("focus")) {
            ulList.classList.toggle("focus");
            buttonList.classList.toggle("action");
        }
    }
});

ulList.onclick = function (e) {
    e.stopPropagation();
}



let image = document.querySelectorAll(".gallery .images img");
image.forEach(img => {
    img.addEventListener('click', (e) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';

        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }

        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = 'close-button';
        popupBox.appendChild(closeButton);
    });
});

document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});


let settings = document.querySelector(".settings");
let settingsIcon = document.querySelector(".settings .icon i");

settingsIcon.onclick = function() {
    settings.classList.toggle("motion");

    this.classList.toggle("start");

    // if (settings.classList.contains("motion")) {
    //     document.body.onclick = function() {
    //         settings.classList.remove("motion");
    //     }
    // }
};

let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
    // console.log(mainColor);
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));
    document.querySelectorAll(".settings .box .color-option ul li").forEach(element => {
        element.classList.remove("active");

        if (element.dataset.color === mainColor) {
            element.classList.add("active");
        }
    });

}

const colorsLi = document.querySelectorAll(".settings .box .color-option ul li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e)=> {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        localStorage.setItem("color_option", e.target.dataset.color);

        hindaleActive(e);

    });
});



// background option
let backgroundOption = true;
let backgroundInterval;

// local
let backgroundLocal = localStorage.getItem("background_chose");
if (backgroundLocal !== null) {
    if (localStorage.getItem("background_chose") === 'yes') {
        backgroundOption = true;
        randomizeImgs();
    }
    else {
        backgroundOption = false;
        clearInterval(backgroundInterval);
    }
    document.querySelectorAll(".random-background span").forEach(e => {
        e.classList.remove("active");
        if (e.dataset.background === localStorage.getItem("background_chose")) {
            e.classList.add("active");
        }
    });
}


const randomBackgrond = document.querySelectorAll(".random-background span");
randomBackgrond.forEach(span => {
    span.addEventListener("click", (e) => {
        hindaleActive(e);

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
        }
        else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
        }
        localStorage.setItem("background_chose", e.target.dataset.background);
    });
});

// background
let background = document.querySelector(".landing-page");
let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "07.jpg"];


function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(function () {
            let randomNumber = Math.floor(Math.random() * imgArray.length);
            background.style.backgroundImage = 'url("images/' +imgArray[randomNumber]+ '")';
            }, 10000);
    }
}
randomizeImgs();


// select skills selector
let skills = document.querySelector(".skills");

window.onscroll = function () {
    let windowScroll = window.scrollY;
    // console.log(windowScroll);
    let skillsOff = skills.offsetTop;
    // console.log(skillsOff);
    let skillsHeight = skills.offsetHeight;
    // console.log(skillsHeight);
    let windowHeight = this.innerHeight;
    // console.log(windowHeight);
    // console.log(skillsOff + skillsHeight - windowHeight);
    if (windowScroll >= (skillsOff + skillsHeight - windowHeight)) {
        document.querySelectorAll(".skills .skills-box .skills-progress span").forEach(e => {
            e.style.width = e.dataset.progress;
        });
    }
}

// nav
let nav = document.querySelectorAll(".nav-bullet .bullet");
let link = document.querySelectorAll("header .links .ul-lincks li a");

function scro(el) {
    el.forEach(bullet => {
        bullet.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.scroll).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

scro(nav);
scro(link);



// function hindel
function hindaleActive(ele) {
    ele.target.parentElement.querySelectorAll(".active").forEach(el => {
        el.classList.remove("active");
    });
    ele.target.classList.add("active");
}


// local bullets
let bulletsCont = document.querySelector(".nav-bullet");

let bulletLocal = localStorage.getItem("bullet_option");
if (bulletLocal !== null) {
    if (bulletLocal === "no") {
        bulletsCont.style.display = "none";
    } else {
        bulletsCont.style.display = "block";
    }
    document.querySelectorAll(".random-bullets span").forEach(e => {
        e.classList.remove("active");
        if (e.dataset.bullets === bulletLocal) {
            e.classList.add("active");
        }
    });
}
// bullets
const showBul = document.querySelectorAll(".random-bullets span");
showBul.forEach(span => {
    span.addEventListener("click", (e)=> {
        hindaleActive(e);

        if (e.target.dataset.bullets === "no") {
            bulletsCont.style.display = "none";
        } else {
            bulletsCont.style.display = "block";
        }
        localStorage.setItem("bullet_option", e.target.dataset.bullets);
    })
});


// reset local
document.querySelector(".settings .reset-option").onclick = function() {
    // localStorage.clear();
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullet_option");
    window.location.reload();
};