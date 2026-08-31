```javascript
/* =====================================================
   OUR STORY — CLEAN BOOK SCRIPT
===================================================== */

const PASSWORD = "JoashManicum";

const TOTAL_PAGES = 10;
const TOTAL_SHEETS = Math.ceil(TOTAL_PAGES / 2);


/* =====================================================
   ELEMENTS
===================================================== */

const closedBook = document.getElementById("closedBook");
const cover = document.getElementById("cover");

const passwordScene = document.getElementById("passwordScene");
const scrapbookScene = document.getElementById("scrapbookScene");

const passwordInput = document.getElementById("passwordInput");
const unlockButton = document.getElementById("unlockButton");
const passwordError = document.getElementById("passwordError");

const pagesContainer = document.getElementById("pages");

const leftStack = document.getElementById("leftStack");
const rightStack = document.getElementById("rightStack");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const pageCounter = document.getElementById("pageCounter");


/* =====================================================
   BOOK STATE
===================================================== */

let unlocked = false;
let currentSheet = 0;
let turning = false;


/* =====================================================
   OPEN GREEN COVER
===================================================== */

cover.addEventListener("click", function () {

    if (cover.classList.contains("opening")) {
        return;
    }

    cover.classList.add("opening");

    setTimeout(function () {

        closedBook.classList.add("hidden");

        passwordScene.classList.remove("hidden");

        setTimeout(function () {

            passwordInput.focus();

        }, 600);

    }, 1100);

});


/* =====================================================
   PASSWORD
===================================================== */

unlockButton.addEventListener("click", unlockBook);


passwordInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        unlockBook();
    }

});


function unlockBook() {

    const enteredPassword = passwordInput.value;


    /* WRONG PASSWORD */

    if (enteredPassword !== PASSWORD) {

        passwordError.classList.remove("show");

        void passwordError.offsetWidth;

        passwordError.classList.add("show");

        passwordInput.value = "";

        passwordInput.focus();

        return;
    }


    /* CORRECT PASSWORD */

    unlocked = true;

    buildBook();

    passwordScene.classList.add("hidden");

    setTimeout(function () {

        scrapbookScene.classList.remove("hidden");

        currentSheet = 0;

        updateBook();

    }, 500);

}


/* =====================================================
   BUILD BOOK
===================================================== */

function buildBook() {

    pagesContainer.innerHTML = "";


    for (
        let sheetNumber = 0;
        sheetNumber < TOTAL_SHEETS;
        sheetNumber++
    ) {

        const sheet = createSheet(sheetNumber);

        pagesContainer.appendChild(sheet);

    }


    const sheets = pagesContainer.querySelectorAll(".page");


    sheets.forEach(function (sheet, index) {

        sheet.classList.remove("flipped");

        sheet.style.zIndex =
            TOTAL_SHEETS - index;

    });


    currentSheet = 0;

}


/* =====================================================
   CREATE PHYSICAL SHEET
===================================================== */

function createSheet(sheetNumber) {

    const sheet = document.createElement("div");

    sheet.className = "page";

    sheet.style.setProperty(
        "--page-z",
        TOTAL_SHEETS - sheetNumber
    );


    const frontNumber =
        sheetNumber * 2 + 1;

    const backNumber =
        sheetNumber * 2 + 2;


    /* FRONT */

    const front = document.createElement("div");

    front.className =
        "page-face page-front";

    front.innerHTML =
        createPageContent(frontNumber);


    /* BACK */

    const back = document.createElement("div");

    back.className =
        "page-face page-back";

    if (backNumber <= TOTAL_PAGES) {

        back.innerHTML =
            createPageContent(backNumber);

    }


    sheet.appendChild(front);
    sheet.appendChild(back);


    return sheet;

}


/* =====================================================
   PAGE CONTENT
===================================================== */

function createPageContent(pageNumber) {

    const titles = [
        "Our Beginning",
        "The Little Things",
        "Favourite Memories",
        "Adventures Together",
        "Just Us",
        "The Moments I Keep",
        "Through It All",
        "My Favourite Person",
        "You & Me",
        "Forever & Always"
    ];


    const title =
        titles[pageNumber - 1] ||
        "Our Story";


    return `
        <div class="scrap-content">

            <div class="floral floral-tl">
                ❦
            </div>

            <div class="floral floral-tr">
                ❦
            </div>

            <div class="floral floral-bl">
                ❦
            </div>

            <div class="floral floral-br">
                ❦
            </div>

            <div class="eyebrow">
                A memory to keep
            </div>

            <h3>
                ${title}
            </h3>

            <div class="divider">
                ❧ ❦ ❧
            </div>

            <div class="photo-placeholder">
                PHOTO ${pageNumber}
            </div>

            <div class="scrap-date">
                Your date goes here
            </div>

            <p class="scrap-text">
                Your photograph, memories and
                personal message will live here.
            </p>

            <div class="page-number">
                ${String(pageNumber).padStart(2, "0")}
            </div>

        </div>
    `;

}


/* =====================================================
   NEXT
===================================================== */

nextButton.addEventListener("click", nextSpread);


function nextSpread() {

    if (!unlocked || turning) {
        return;
    }


    if (currentSheet >= TOTAL_SHEETS - 1) {
        return;
    }


    turning = true;


    const sheets =
        pagesContainer.querySelectorAll(".page");


    const sheet =
        sheets[currentSheet];


    if (sheet) {

        sheet.classList.add("flipped");

    }


    currentSheet++;


    updateBook();


    setTimeout(function () {

        turning = false;

    }, 1300);

}


/* =====================================================
   PREVIOUS
===================================================== */

previousButton.addEventListener(
    "click",
    previousSpread
);


function previousSpread() {

    if (!unlocked || turning) {
        return;
    }


    if (currentSheet <= 0) {
        return;
    }


    turning = true;


    currentSheet--;


    const sheets =
        pagesContainer.querySelectorAll(".page");


    const sheet =
        sheets[currentSheet];


    if (sheet) {

        sheet.classList.remove("flipped");

    }


    updateBook();


    setTimeout(function () {

        turning = false;

    }, 1300);

}


/* =====================================================
   UPDATE BOOK
===================================================== */

function updateBook() {

    updateNavigation();

    updateStacks();

    updateLayers();

}


/* =====================================================
   PAGE COUNTER
===================================================== */

function updateNavigation() {

    const leftPage =
        currentSheet * 2 + 1;

    const rightPage =
        Math.min(
            currentSheet * 2 + 2,
            TOTAL_PAGES
        );


    pageCounter.textContent =
        `${leftPage}–${rightPage} / ${TOTAL_PAGES}`;


    previousButton.disabled =
        currentSheet <= 0;


    nextButton.disabled =
        currentSheet >= TOTAL_SHEETS - 1;

}


/* =====================================================
   PAGE LAYERS
===================================================== */

function updateLayers() {

    const sheets =
        pagesContainer.querySelectorAll(".page");


    sheets.forEach(function (sheet, index) {

        if (index < currentSheet) {

            sheet.style.zIndex =
                100 + index;

        } else {

            sheet.style.zIndex =
                TOTAL_SHEETS - index;

        }

    });

}


/* =====================================================
   PAGE STACKS
===================================================== */

function updateStacks() {

    const leftThickness =
        Math.max(
            3,
            Math.min(
                currentSheet * 3,
                22
            )
        );


    const remainingSheets =
        TOTAL_SHEETS -
        currentSheet -
        1;


    const rightThickness =
        Math.max(
            3,
            Math.min(
                remainingSheets * 3,
                22
            )
        );


    leftStack.style.width =
        `${leftThickness}px`;

    leftStack.style.left =
        `${-leftThickness}px`;


    rightStack.style.width =
        `${rightThickness}px`;

    rightStack.style.right =
        `${-rightThickness}px`;

}


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.target.tagName === "INPUT"
        ) {
            return;
        }


        if (!unlocked) {
            return;
        }


        if (
            event.key === "ArrowRight"
        ) {

            nextSpread();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousSpread();

        }

    }
);


/* =====================================================
   INITIAL STATE
===================================================== */

previousButton.disabled = true;

nextButton.disabled = true;
```

