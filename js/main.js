var header = document.querySelector("#header");
var offer = document.querySelector(".offer");
var sections = Array.from(document.querySelectorAll("section"));
var navLinks = Array.from(document.querySelectorAll(".nav__link"));

document.addEventListener("scroll", function () {
    if (offer.getBoundingClientRect().top < 0) {
        header.classList.add("header--fixed");
    } else {
        header.classList.remove("header--fixed");
    }

    sections.forEach((item) => {
        var currentLink;
        if (
            item.getBoundingClientRect().top < 0 &&
            item.getBoundingClientRect().top * -1 < item.offsetHeight &&
            !currentLink
        ) {
            currentLink = navLinks.find(
                (link) => link.getAttribute("href") === "#" + item.id
            );
            let activeLink = navLinks.find((link) =>
                link.classList.contains("nav__link--active")
            );
            if (activeLink && currentLink && activeLink !== currentLink) {
                navLinks.forEach((navLink) => {
                    navLink.classList.remove("nav__link--active");
                });
                if (currentLink) {
                    currentLink.classList.add("nav__link--active");
                }
            }
        }
    });
});

document.addEventListener("click", function () {
    if (event.target.classList.contains("open-modal")) {
        document
            .querySelector("#" + event.target.getAttribute("data-modal"))
            .classList.add("modal--open");
    }
    if (event.target.classList.contains("modal__close")) {
        event.target.closest(".modal--open").classList.remove("modal--open");
    }
});

document.addEventListener("keydown", function () {
    if (event.keyCode === 27 && document.querySelector(".modal--open")) {
        document.querySelector(".modal--open").classList.remove("modal--open");
    }
});

document.addEventListener("click", function () {
    if (!event.target.classList.contains("custom_select__selected")) {
        var openSelect = document.querySelector(".custom_select__list");
        openSelect.classList.remove("custom_select__list--open");
    }
});

function customSelect() {
    if (document.querySelector(".custom_select")) {
        var select = document.querySelector(".custom_select");
        select.setAttribute("hidden", "");

        var options = Array.from(select.querySelectorAll("option"));
        options[0].innerHTML = "Тема встречи";

        var wrap = document.createElement("div");
        wrap.classList.add("custom_select__wrap", "form__input");
        select.parentNode.insertBefore(wrap, select);

        var selected = document.createElement("button");
        selected.setAttribute("type", "button");
        selected.classList.add("custom_select__selected");
        selected.innerText = options[0].innerText;
        wrap.appendChild(selected);

        var list = document.createElement("div");
        list.classList.add("custom_select__list");
        wrap.appendChild(list);

        options.forEach((item) => {
            var listItem = document.createElement("button");
            listItem.setAttribute("type", "button");
            listItem.classList.add("custom_select__option");
            listItem.innerText = item.innerText;

            if (item.value === "placeholder") {
                listItem.setAttribute("disabled", "");
            }

            list.appendChild(listItem);

            listItem.onclick = function () {
                list.classList.toggle("custom_select__list--open");
                listItem.classList.toggle("custom_select__option--choice");
                selected.innerText = listItem.innerText;
                select.value = item.value;
            };
        });

        selected.onclick = function () {
            list.classList.toggle("custom_select__list--open");
        };
    }
}

customSelect();

function customSlider(sliderClassName, dotsOff, circleOff) {
    let slider = document.querySelector(sliderClassName);
    let currentSlide = 0;
    let slides = slider.querySelectorAll(".slider__elem");
    let sliderList = slider.querySelector(".slider__list");
    let list = document.createElement("ul");

    list.classList.add("custom_slider__dots");
    slider.appendChild(list);

    let mousePressed = false;
    let swipe = [];

    for (i = 0; i < slides.length; i++) {
        let li = document.createElement("li");
        let btn = document.createElement("button");

        btn.classList.add("custom_slider__dot");
        btn.innerText = i + 1;
        li.appendChild(btn);
        list.appendChild(li);
    }

    let buttons = slider.querySelectorAll(".custom_slider__dot");

    buttons.forEach((btn) => {
        btn.onclick = function () {
            btn.classList.add("custom_slider__dot--current");
            currentSlide = btn.innerText - 1;
            changeSlide();
        };
    });

    if (dotsOff) {
        list.classList.add("custom_slider__dots--off");
    }

    let changeSlide = () => {
        slides.forEach((item) => {
            item.classList.remove("slider__elem--active");
        });

        buttons.forEach((btn) => {
            btn.classList.remove("custom_slider__dot--current");
        });

        currentSlide >= slides.length ? (currentSlide = 0) : null;
        currentSlide <= -1 ? (currentSlide = slides.length - 1) : null;

        currentSlide === 0;

        buttons[currentSlide].classList.add("custom_slider__dot--current");
        slides[currentSlide].classList.add("slider__elem--active");

        if (circleOff && currentSlide === 0) {
            slider
                .querySelector(".custom_slider__arrow--prev")
                .classList.add("slider__arrow--off");
        } else {
            slider
                .querySelector(".custom_slider__arrow--prev")
                .classList.remove("slider__arrow--off");
        }
        if (circleOff && currentSlide === 2) {
            slider
                .querySelector(".custom_slider__arrow--next")
                .classList.add("slider__arrow--off");
        } else {
            slider
                .querySelector(".custom_slider__arrow--next")
                .classList.remove("slider__arrow--off");
        }
    };

    function prevSlide() {
        currentSlide--;
        changeSlide();
    }
    function nextSlide() {
        currentSlide++;
        changeSlide();
    }

    changeSlide();

    slider
        .querySelector(".custom_slider__arrow--prev")
        .addEventListener("click", function () {
            prevSlide();
        });
    slider
        .querySelector(".custom_slider__arrow--next")
        .addEventListener("click", function () {
            nextSlide();
        });

    sliderList.addEventListener("mousedown", () => {
        mousePressed = true;
        swipe[0] = event.clientX;
    });

    sliderList.addEventListener("mouseup", () => {
        mousePressed = false;
        swipe[1] = event.clientX;

        if (swipe[0] !== swipe[1] && !circleOff) {
            swipe[0] > swipe[1] ? prevSlide() : nextSlide();
        }
    });
}

customSlider(".slider-1", false, false);
customSlider(".slider-2", true, true);

function counter(elemClassName) {
    let counterTarget = document.querySelectorAll(elemClassName);
    let counted = false;

    document.addEventListener("scroll", function () {
        for (i = 0; i < counterTarget.length; i++) {
            if (
                counterTarget[i].offsetTop - 500 < window.pageYOffset &&
                !counted
            ) {
                startCount(i);
            }
        }
    });

    function startCount(index) {
        let current = 0;
        let target = counterTarget[index];
        let max = target.getAttribute("data-max");

        let counterId = setInterval(function () {
            if (current <= max) {
                target.innerText = current;
                current++;
            } else {
                clearInterval(counterId);
                counted = true;
            }
        }, 1000 / max);
    }
}

counter(".services__number");

function showNotification(notificationId) {
    let target = document.querySelector(notificationId);
    setTimeout(function () {
        target.classList.add("notification--active");
        setTimeout(function () {
            target.classList.remove("notification--active");
        }, 6000);
    }, 5000);
}

showNotification("#test");

function tabs(tabsId) {
    let tabsParent = document.querySelector(tabsId);
    let tabsContents = tabsParent.children;

    let ul = document.createElement("ul");
    ul.classList.add("tabs_togglers_list");

    Array.from(tabsContents).forEach((item, index) => {
        let li = document.createElement("li");
        let button = document.createElement("button");
        button.classList.add("tabs_toggler");
        button.innerText = item.title;
        button.setAttribute("data-index", index);
        if (index === 0) {
            button.classList.add("tabs_toggler--active");
        }
        li.appendChild(button);
        ul.appendChild(li);
    });

    ul.addEventListener("click", function () {
        if (event.target.classList.contains("tabs_toggler")) {
            Array.from(tabsContents).forEach((item) => {
                item.classList.remove("tabs__item--active");
            });
            Array.from(ul.querySelectorAll(".tabs_toggler")).forEach((item) => {
                item.classList.remove("tabs_toggler--active");
            });
            event.target.classList.add("tabs_toggler--active");
            tabsContents[event.target.getAttribute("data-index")].classList.add(
                "tabs__item--active"
            );
        }
    });
    tabsParent.parentNode.insertBefore(ul, tabsParent);
}

tabs("#tabs1");
