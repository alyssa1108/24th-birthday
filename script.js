```javascript
/* =====================================================
   OUR STORY
   COMPLETE BOOK ENGINE
===================================================== */


/* =====================================================
   SETTINGS
===================================================== */

const PASSWORD = "JoashManicum";

const TOTAL_PAGES = 10;

const TOTAL_SHEETS = Math.ceil(TOTAL_PAGES / 2);


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
   STATE
===================================================== */

let unlocked = false;

let currentSheet = 0;

let turning = false;


/* =====================================================
   OPEN THE GREEN COVER
===================================================== */

if (cover) {

    cover.addEventListener(
        "click",
        openCover
    );

}


function openCover() {

    /*
        Prevent double-clicking the cover
        while it is opening.
    */

    if (
        cover.classList.contains("opening")
    ) {

        return;

    }


    cover.classList.add("opening");


    /*
        Wait until the cover has physically
        started opening before hiding it.
    */

    setTimeout(() => {

        closedBook.classList.add("hidden");

        passwordScene.classList.remove("hidden");


        /*
            Focus the password box after
            the password spread appears.
        */

        setTimeout(() => {

            if (passwordInput) {

                passwordInput.focus();

            }

        }, 600);

    }, 1100);

}


/* =====================================================
   PASSWORD BUTTON
===================================================== */

if (unlockButton) {

    unlockButton.addEventListener(
        "click",
        unlockBook
    );

}


if (passwordInput) {

    passwordInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                unlockBook();

            }

        }
    );

}


function unlockBook() {

    if (!passwordInput) {

        return;

    }


    const enteredPassword =
        passwordInput.value;


    /*
        WRONG PASSWORD
    */

    if (
        enteredPassword !== PASSWORD
    ) {

        if (passwordError) {

            passwordError.classList.remove(
                "show"
            );


            /*
                Restart the shake animation.
            */

            void passwordError.offsetWidth;


            passwordError.classList.add(
                "show"
            );

        }


        passwordInput.value = "";

        passwordInput.focus();

        return;

    }


    /*
        CORRECT PASSWORD
    */

    unlocked = true;


    /*
        Build the entire scrapbook
        BEFORE displaying it.
    */

    buildBook();


    /*
        Hide the password scene.
    */

    passwordScene.classList.add(
        "hidden"
    );


    /*
        Give the password scene time
        to disappear before showing
        the scrapbook.
    */

    setTimeout(() => {

        scrapbookScene.classList.remove(
            "hidden"
        );

        currentSheet = 0;

        updateBook();

    }, 500);

}


/* =====================================================
   BUILD ENTIRE SCRAPBOOK
===================================================== */

function buildBook() {

    if (!pagesContainer) {

        return;

    }


    pagesContainer.innerHTML = "";


    /*
        Create EVERY physical sheet.

        Nothing gets created while
        the user is turning pages.
    */

    for (
        let sheetNumber = 0;
        sheetNumber < TOTAL_SHEETS;
        sheetNumber++
    ) {

        const sheet =
            createSheet(sheetNumber);


        pagesContainer.appendChild(
            sheet
        );

    }


    /*
        Make sure every sheet begins
        on the right side.
    */

    const sheets =
        pagesContainer.querySelectorAll(
            ".page"
        );


    sheets.forEach(
        (sheet, index) => {

            sheet.classList.remove(
                "flipped"
            );


            sheet.style.setProperty(
                "--page-z",
                TOTAL_SHEETS - index
            );

        }
    );


    currentSheet = 0;

}


/* =====================================================
   CREATE PHYSICAL SHEET
===================================================== */

function createSheet(sheetNumber) {

    const sheet =
        document.createElement("div");


    sheet.className = "page";


    /*
        The first sheet must be on top.

        Later sheets sit underneath it.
    */

    sheet.style.setProperty(
        "--page-z",
        TOTAL_SHEETS - sheetNumber
    );


    const frontNumber =
        sheetNumber * 2 + 1;


    const backNumber =
        sheetNumber * 2 + 2;


    /*
        FRONT
        Example:

        sheet 0 = page 1
        sheet 1 = page 3
        sheet 2 = page 5
    */

    const front =
        document.createElement("div");


    front.className =
        "page-face page-front";


    front.innerHTML =
        createPageContent(
            frontNumber
        );


    /*
        BACK
        Example:

        sheet 0 = page 2
        sheet 1 = page 4
        sheet 2 = page 6
    */

    const back =
        document.createElement("div");


    back.className =
        "page-face page-back";


    if (
        backNumber <= TOTAL_PAGES
    ) {

        back.innerHTML =
            createPageContent(
                backNumber
            );

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
   NEXT PAGE
===================================================== */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextSpread
    );

}


function nextSpread() {

    if (
        !unlocked ||
        turning
    ) {

        return;

    }


    /*
        Already at the final sheet.
    */

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


    /*
        Flip the CURRENT physical sheet.

        Sheet 0:
            1 → 2

        Sheet 1:
            3 → 4

        Sheet 2:
            5 → 6

        etc.
    */

    const sheet =
        sheets[currentSheet];


    if (sheet) {

        sheet.classList.add(
            "flipped"
        );

    }


    /*
        Move to the next physical sheet.

        This is the important part.

        After sheet 0 flips:

            LEFT  = 2
            RIGHT = 3

        After sheet 1 flips:

            LEFT  = 4
            RIGHT = 5
    */

    currentSheet++;


    updateBook();


    setTimeout(() => {

        turning = false;

    }, 1300);

}


/* =====================================================
   PREVIOUS PAGE
===================================================== */

if (previousButton) {

    previousButton.addEventListener(
        "click",
        previousSpread
    );

}


function previousSpread() {

    if (
        !unlocked ||
        turning
    ) {

        return;

    }


    /*
        Already at the beginning.
    */

    if (
        currentSheet <= 0
    ) {

        return;

    }


    turning = true;


    /*
        Move BACK to the physical sheet
        that was previously turned.
    */

    currentSheet--;


    const sheets =
        pagesContainer.querySelectorAll(
            ".page"
        );


    const sheet =
        sheets[currentSheet];


    /*
        Rotate that SAME physical sheet
        back to the right.
    */

    if (sheet) {

        sheet.classList.remove(
            "flipped"
        );

    }


    updateBook();


    setTimeout(() => {

        turning = false;

    }, 1300);

}


/* =====================================================
   UPDATE EVERYTHING
===================================================== */

function updateBook() {

    updateStacks();

    updateNavigation();

    updateSheetLayers();

}


/* =====================================================
   UPDATE SHEET LAYERS
===================================================== */

function updateSheetLayers() {

    const sheets =
        pagesContainer.querySelectorAll(
            ".page"
        );


    sheets.forEach(
        (sheet, index) => {

            /*
                Flipped sheets must remain
                visually above the sheets
                underneath them.

                This prevents the pages
                from appearing merged.
            */

            if (
                index < currentSheet
            ) {

                sheet.style.zIndex =
                    100 + index;

            } else {

                sheet.style.zIndex =
                    TOTAL_SHEETS - index;

            }

        }
    );

}


/* =====================================================
   UPDATE STACKS
===================================================== */

function updateStacks() {

    if (
        !leftStack ||
        !rightStack
    ) {

        return;

    }


    /*
        Every completed sheet contributes
        to the left stack.
    */

    const turnedSheets =
        currentSheet;


    /*
        Remaining sheets stay on the right.
    */

    const remainingSheets =
        TOTAL_SHEETS -
        currentSheet -
        1;


    const leftThickness =
        Math.min(
            Math.max(
                turnedSheets * 3,
                3
            ),
            22
        );


    const rightThickness =
        Math.min(
            Math.max(
                remainingSheets * 3,
                3
            ),
            22
        );


    /*
        LEFT STACK
    */

    leftStack.style.width =
        `${leftThickness}px`;


    leftStack.style.left =
        `${-leftThickness}px`;


    /*
        RIGHT STACK
    */

    rightStack.style.width =
        `${rightThickness}px`;


    rightStack.style.right =
        `${-rightThickness}px`;

}


/* =====================================================
   PAGE COUNTER
===================================================== */

function updateNavigation() {

    if (
        !pageCounter
    ) {

        return;

    }


    /*
        At sheet 0:

            1–2 / 10

        At sheet 1:

            3–4 / 10

        At sheet 2:

            5–6 / 10
    */

    const leftPage =
        currentSheet * 2 + 1;


    const rightPage =
        Math.min(
            currentSheet * 2 + 2,
            TOTAL_PAGES
        );


    pageCounter.textContent =
        `${leftPage}–${rightPage} / ${TOTAL_PAGES}`;


    if (previousButton) {

        previousButton.disabled =
            currentSheet <= 0;

    }


    if (nextButton) {

        nextButton.disabled =
            currentSheet >=
            TOTAL_SHEETS - 1;

    }

}


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        /*
            Don't turn pages while typing
            the password.
        */

        if (
            event.target.tagName ===
            "INPUT"
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

if (previousButton) {

    previousButton.disabled = true;

}


if (nextButton) {

    nextButton.disabled = true;

}
```
