const employeProfilesContainer = document.querySelector(".grid-profiles");
const myLightbox = document.querySelector("#mylightbox");
const header = document.querySelector("header");
const btn = document.querySelector(".btn");
const btnContainer = document.querySelector(".btn-container");





btn.addEventListener("click", (e) => {
    fetch("https://randomuser.me/api/?results=12")
        .then(response => response.json())
        .then(data => generateHTML(data.results))
        .catch(error => console.log("Looks like there was a problem!", error));
    btnContainer.remove();
    header.classList.remove("hidden");

});





function generateHTML(data) {

    let countMain = 0;
    data.map(result => {
        const div = document.createElement("div");
        div.classList.add("col");
        employeProfilesContainer.appendChild(div);
        div.innerHTML = `  
        <div class="content-container" data-id="${++countMain}">
        <div class="content-img">
        <img src="${result.picture.large}" alt="user">
        </div>
        <div class="content">
        <h2>${result.name.first} ${result.name.last}</h2>
        <p href="mailto:${result.email}">${result.email}</p>
        <p>${result.location.city}</p>
        <p class="hidden">${result.login.username}</p>
        </div>
        </div>
        `;
        (function (n) {
            div.addEventListener("click", (e) => {
                myLightbox.classList.add("active");
                popup(`popup${n}`);

            });



        }(countMain));

    });


    let count = 0;
    data.map(result => {
        const divgallery = document.createElement("div");
        divgallery.classList.add("gallery");
        divgallery.classList.add("show");
        divgallery.id = `popup${++count}`;
        myLightbox.appendChild(divgallery);
        divgallery.innerHTML = `  
        
        <div class="popup-wrapper">
        <a class="arrow-right">&gt;</a>
        <a class="arrow-left">&lt;</a>
        <a class="close">&#10006;</a>
        
        <div class="popup-content-img">
        <img src="${result.picture.large}" alt="user">
        </div>
        <div class="popup-content">
        <h2>${result.name.first} ${result.name.last}</h2>
        <p class="address">${result.login.username}</p>
        <a href="mailto:${result.email}" class="address">${result.email}</a>
        <p>${result.location.city}</p>
        <hr>
        <p class="address">${phoneFormat(result.phone)}</p>
        <p class="address">${result.location.street.number} ${result.location.street.name}, ${result.location.state}, ${result.location.postcode}</p>
        <p class="address">Birthday: ${formatDateBirth(result.dob.date)}</p>
        </div>
        </div>
        `;


    });




}

function popup(id) {
    let list = myLightbox.querySelectorAll(".gallery");

    list.forEach(element => {
        if (element.id === id) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });

}


function left() {
    let current = myLightbox.querySelector(".gallery.active");
    if (!current) return false;
    let left = getPrevSibling(current, ".gallery.show") || getLastSibling(current, ".gallery.show");
    popup(left.id);

}

function right() {
    let current = myLightbox.querySelector(".gallery.active");
    if (!current) return false;
    let right = getNextSibling(current, ".gallery.show") || getFirstSibling(current, ".gallery.show");
    popup(right.id);

}






window.addEventListener("keyup", (e) => {

    if (e.keyCode == 37) {
        // left arrow
        left();
    } else if (e.keyCode == 39) {
        // right arrow
        right();
    } else if (e.keyCode == 27) {
        myLightbox.classList.remove("active");
        myLightbox.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
    }
});

window.addEventListener("click", (e) => {

    if (e.target.classList.contains('arrow-left')) {
        // left arrow
        left();
    } else if (e.target.classList.contains('arrow-right')) {
        // right arrow
        right();
    } else if (e.target.matches(".gallery.show.active") || e.target.classList.contains('close')) {
        myLightbox.classList.remove("active");
        myLightbox.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
    }

});

window.addEventListener("touchstart", (e) => {

    if (e.target.classList.contains('arrow-left')) {
        // left arrow
        left();
    } else if (e.target.classList.contains('arrow-right')) {
        // right arrow
        right();
    } else if (e.target.matches(".gallery.show.active") || e.target.classList.contains('close')) {
        myLightbox.classList.remove("active");
        myLightbox.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
    }

});




// Matches for search lightbox and filter
function getNextSibling(elem, selector) {
    let sibling = elem.nextElementSibling;
    if (!selector) return sibling;
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling;
    }
};

function getPrevSibling(elem, selector) {
    let sibling = elem.previousElementSibling;
    if (!selector) return sibling;
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.previousElementSibling;
    }
};

function getFirstSibling(elem, selector) {
    let sibling = elem.parentNode.firstElementChild;
    if (!selector) return sibling;
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling;
    }
};

function getLastSibling(elem, selector) {
    let sibling = elem.parentNode.lastElementChild;
    if (!selector) return sibling;

    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.previousElementSibling;
    }
};

// ==========================================================================================================================================


//search box 



const input = document.querySelector("input");

input.addEventListener("keyup", () => {

    let inputValue = input.value.toUpperCase();
    const col = document.querySelectorAll(".col");
    const gallery = document.querySelectorAll(".gallery");


    let names;
    let namesText;
    let userName;
    let userNameText;

    for (let i = 0; i < col.length; i++) {
        names = col[i].querySelectorAll("h2")[0];
        userName = col[i].querySelectorAll(".hidden")[0];
        namesText = names.textContent || names.innerText;
        userNameText = userName.textContent || userName.innerText;

        if (namesText.toUpperCase().indexOf(inputValue) > -1 || userNameText.toUpperCase().indexOf(inputValue) > -1) {
            col[i].style.display = "";
            gallery[i].classList.add("show");

        } else {
            col[i].style.display = "none";
            gallery[i].classList.remove("show");
        }

    }

});

input.value = "";

// phone validation


function phoneFormat(phone) {

    phone = phone.replace(/[^\d]/g, "");


    if (phone.length <= 9) {
        return phone.replace(/(\d{3})(\d{2})(\d{2})/, "($1) $2-$3");
    } else if (phone.length <= 11) {

        return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }

    return phone;
}


// date validation  
function formatDateBirth(data) {
    data = data.replace(/[^\d]/g, "");
    let dataSub = data.substr(2, 6);
    return dataSub.replace(/(\d{2})(\d{2})(\d{2})/, "$3/$2/$1");
}