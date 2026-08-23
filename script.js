/* =====================================================
   BIRTHDAY CHAOS ENGINE
===================================================== */

const pages = document.querySelectorAll(".page");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const currentPageText =
    document.getElementById("currentPage");

const totalPagesText =
    document.getElementById("totalPages");

const progressBar =
    document.getElementById("progressBar");

const restartBtn =
    document.querySelector(".restart-btn");

const audio =
    document.getElementById("birthdayAudio");

const video =
    document.getElementById("friendVideo");


let currentPage = 0;

const totalPages = pages.length;

totalPagesText.textContent =
    String(totalPages).padStart(2, "0");


/* =====================================================
   SHOW PAGE
===================================================== */

function showPage(index) {

    if (index < 0) {
        index = totalPages - 1;
    }

    if (index >= totalPages) {
        index = 0;
    }

    currentPage = index;

    pages.forEach((page, i) => {

        page.classList.toggle(
            "active",
            i === currentPage
        );

    });

    currentPageText.textContent =
        String(currentPage + 1).padStart(2, "0");

    progressBar.style.width =
        `${((currentPage + 1) / totalPages) * 100}%`;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* Stop video when leaving video page */

    if (currentPage !== 4 && video) {

        video.pause();

    }
}


/* =====================================================
   NEXT / PREVIOUS
===================================================== */

function nextPage() {

    if (currentPage < totalPages - 1) {

        showPage(currentPage + 1);

    }

}

function previousPage() {

    if (currentPage > 0) {

        showPage(currentPage - 1);

    }

}


nextBtn.addEventListener(
    "click",
    nextPage
);

prevBtn.addEventListener(
    "click",
    previousPage
);


/* =====================================================
   ALL NEXT BUTTONS
===================================================== */

document
    .querySelectorAll(".next-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            nextPage
        );

    });


/* =====================================================
   RESTART
===================================================== */

if (restartBtn) {

    restartBtn.addEventListener(
        "click",
        () => {

            showPage(0);

            if (audio) {

                audio.currentTime = 0;

            }

        }
    );

}


/* =====================================================
   KEYBOARD NAVIGATION
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowRight") {

            nextPage();

        }

        if (event.key === "ArrowLeft") {

            previousPage();

        }

    }
);


/* =====================================================
   TOUCH SWIPE
===================================================== */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;

    if (Math.abs(difference) < 60) {
        return;
    }

    if (difference > 0) {

        nextPage();

    } else {

        previousPage();

    }

}


/* =====================================================
   RANDOM FLOATING EMOJI MOVEMENT
===================================================== */

const floating =
    document.querySelectorAll(
        ".floating-elements span"
    );

floating.forEach(element => {

    element.style.animationDelay =
        `${Math.random() * 5}s`;

});


/* =====================================================
   INITIALIZE
===================================================== */

showPage(0);