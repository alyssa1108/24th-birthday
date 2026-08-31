```javascript
/* =====================================================
   OUR STORY
   PHYSICAL PAGE-STACK BOOK ENGINE
===================================================== */


/* =====================================================
   SETTINGS
===================================================== */

const PASSWORD = "JoashManicum";

const TOTAL_PAGES = 10;

const TOTAL_SHEETS =
    Math.ceil(TOTAL_PAGES / 2);


/* =====================================================
   ELEMENTS
===================================================== */

const closedBook =
    document.getElementById("closedBook");

const cover =
    document.getElementById("cover");

const passwordScene =
    document.getElementById("passwordScene");

const scrapbookScene =
    document.getElementById("scrapbookScene");

const passwordInput =
    document.getElementById("passwordInput");

const unlockButton =
    document.getElementById("unlockButton");

const passwordError =
    document.getElementById("passwordError");

const pagesContainer =
    document.getElementById("pages");

const leftStack =
    document.getElementById("leftStack");

const rightStack =
    document.getElementById("rightStack");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const pageCounter =
    document.getElementById("pageCounter");


/* =====================================================
   BOOK STATE
===================================================== */

let unlocked = false;

let currentSheet = 0;

let turning = false;


/*
    currentSheet:

    0 = 1–2
    1 = 3–4
    2 = 5–6
    3 = 7–8
    4 = 9–10
*/


/* =====================================================
   OPEN COVER
===================================================== */

cover.addEventListener(
    "click",
    openCover
);


function openCover() {

    if (
        cover.classList.contains("opening")
    ) {
        return;
    }

    cover.classList.add("opening");


    setTimeout(() => {

        closedBook.classList.add("hidden");

        passwordScene.classList.remove(
            "hidden"
        );


        setTimeout(() => {

            passwordInput.focus();

        }, 700);

    }, 1100);

}


/* =====================================================
   PASSWORD
===================================================== */

unlockButton.addEventListener(
    "click",
    unlockBook
);


passwordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            unlockBook();

        }

    }
);


function unlockBook() {

    const entered =
        passwordInput.value;


    if (entered !== PASSWORD) {

        passwordError.classList.remove(
            "show"
        );

        void passwordError.offsetWidth;

        passwordError.classList.add(
            "show"
        );

        passwordInput.value = "";

        passwordInput.focus();

        return;

    }


    unlocked = true;


    passwordScene.classList.add(
        "hidden"
    );


    buildBook();


    setTimeout(() => {

        scrapbookScene.classList.remove(
            "hidden"
        );

        updateNavigation();

    }, 500);

}


/* =====================================================
   BUILD BOOK
===================================================== */

function buildBook() {

    pagesContainer.innerHTML = "";


    /*
        Create every physical sheet
        BEFORE any page is turned.
    */

    for (
        let sheetNumber = 0;
        sheetNumber < TOTAL_SHEETS;
        sheetNumber++
    ) {

        const sheet =
            createSheet(sheetNumber);

        pagesContainer.appendChild(sheet);

    }


    updateSheetLayers();

    updateStacks();

}


/* =====================================================
   CREATE PHYSICAL SHEET
===================================================== */

function createSheet(sheetNumber) {

    const sheet =
        document.createElement("div");

    sheet.className = "page";


    sheet.dataset.sheet =
        sheetNumber;


    const frontNumber =
        sheetNumber * 2 + 1;

    const backNumber =
        sheetNumber * 2 + 2;


    const front =
        document.createElement("div");

    front.className =
        "page-face page-front";

    front.innerHTML =
        createPageContent(frontNumber);


    const back =
        document.createElement("div");

    back.className =
        "page-face page-back";


    if (
        backNumber <= TOTAL_PAGES
    ) {

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

    const pageTitles = [

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
        pageTitles[pageNumber - 1]
        || "Our Story";


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
   IMPORTANT:
   SHEET LAYERING
===================================================== */

function updateSheetLayers() {

    const sheets =
        pagesContainer.querySelectorAll(
            ".page"
        );


    sheets.forEach(
        (sheet, index) => {

            /*
                Already-flipped sheets
                sit behind the active sheet.
            */

            if (index < currentSheet) {

                sheet.style.zIndex =
                    10 + index;

            }

            /*
                Unflipped sheets.

                The next sheet gets the
                highest available z-index.
            */

            else {

                sheet.style.zIndex =
                    100 +
                    (TOTAL_SHEETS - index);

            }

        }
    );

}


/* =====================================================
   NEXT
===================================================== */

nextButton.addEventListener(
    "click",
    nextSpread
);


function nextSpread() {

    if (
        !unlocked ||
        turning
    ) {
        return;
    }


    if (
        currentSheet >=
        TOTAL_SHEETS - 1
    ) {
        return;
    }


    turning = true;


    const sheets =
        pagesContainer.querySelectorAll(
            ".page"
        );


    const sheet =
        sheets[currentSheet];


    /*
        Put the turning sheet above
        everything while it rotates.
    */

    sheet.style.zIndex = 1000;


    sheet.classList.add(
        "flipped"
    );


    currentSheet++;


    setTimeout(() => {

        updateSheetLayers();

        updateStacks();

        updateNavigation();

    }, 700);


    setTimeout(() => {

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

    if (
        !unlocked ||
        turning
    ) {
        return;
    }


    if (
        currentSheet <= 0
    ) {
        return;
    }


    turning = true;


    const sheets =
        pagesContainer.querySelectorAll(
            ".page"
        );


    currentSheet--;


    const sheet =
        sheets[currentSheet];


    /*
        Bring the returning sheet
        to the front while it turns.
    */

    sheet.style.zIndex = 1000;


    sheet.classList.remove(
        "flipped"
    );


    setTimeout(() => {

        updateSheetLayers();

        updateStacks();

        updateNavigation();

    }, 700);


    setTimeout(() => {

        turning = false;

    }, 1300);

}


/* =====================================================
   PAGE STACK THICKNESS
===================================================== */

function updateStacks() {

    /*
        Left:

        0 → 0 pages
        1 → 2 pages
        2 → 4 pages
        3 → 6 pages
        4 → 8 pages
    */

    const leftPages =
        currentSheet * 2;


    /*
        Right:

        Remaining sheets.
    */

    const rightPages =
        TOTAL_SHEETS -
        currentSheet -
        1;


    updateStackAppearance(
        leftStack,
        leftPages,
        "left"
    );


    updateStackAppearance(
        rightStack,
        rightPages,
        "right"
    );

}


/* =====================================================
   STACK APPEARANCE
===================================================== */

function updateStackAppearance(
    stack,
    pageCount,
    side
) {

    const thickness =
        Math.min(
            pageCount * 1.5,
            18
        );


    const visibleThickness =
        Math.max(
            thickness,
            3
        );


    if (side === "left") {

        stack.style.width =
            `${visibleThickness}px`;

        stack.style.left =
            `${-visibleThickness}px`;

    }

    else {

        stack.style.width =
            `${visibleThickness}px`;

        stack.style.right =
            `${-visibleThickness}px`;

    }

}


/* =====================================================
   NAVIGATION
===================================================== */

function updateNavigation() {

    previousButton.disabled =
        currentSheet <= 0;


    nextButton.disabled =
        currentSheet >=
        TOTAL_SHEETS - 1;


    const leftPage =
        currentSheet * 2 + 1;


    const rightPage =
        Math.min(
            currentSheet * 2 + 2,
            TOTAL_PAGES
        );


    pageCounter.textContent =
        `${leftPage}–${rightPage} / ${TOTAL_PAGES}`;

}


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

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
```
