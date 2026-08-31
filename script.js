/* =====================================================
   OUR STORY
   REAL PAGE-STACK BOOK ENGINE
===================================================== */


/* =====================================================
   SETTINGS
===================================================== */

const PASSWORD = "JoashManicum";

/*
    Number of scrapbook sheets.

    Each sheet has TWO sides:

    Sheet 1:
        front = page 1
        back  = page 2

    Sheet 2:
        front = page 3
        back  = page 4

    etc.

    We currently have 10 visible scrapbook pages.
    We can change this later when we add your photos.
*/

const TOTAL_PAGES = 10;


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


/*
    currentSheet tells us which SPREAD we are viewing.

    0 = first spread
    1 = second spread
    2 = third spread
    etc.
*/


const TOTAL_SHEETS = Math.ceil(TOTAL_PAGES / 2);


/* =====================================================
   OPEN COVER
===================================================== */

cover.addEventListener("click", openCover);


function openCover() {

    if (cover.classList.contains("opening")) {
        return;
    }

    cover.classList.add("opening");


    /*
        Wait for the physical cover animation.
    */

    setTimeout(() => {

        closedBook.classList.add("hidden");

        passwordScene.classList.remove("hidden");


        /*
            Let the password scene appear first,
            THEN focus the input.
        */

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

    const entered = passwordInput.value;


    if (entered !== PASSWORD) {

        passwordError.classList.remove("show");

        /*
            Restart CSS animation.
        */

        void passwordError.offsetWidth;

        passwordError.classList.add("show");

        passwordInput.value = "";

        passwordInput.focus();

        return;
    }


    /*
        PASSWORD CORRECT
    */

    unlocked = true;


    /*
        Completely remove the password spread
        from the visual flow.

        It will NEVER sit underneath
        the scrapbook.
    */

    passwordScene.classList.add("hidden");


    /*
        Build the actual scrapbook BEFORE
        showing it.
    */

    buildBook();


    setTimeout(() => {

        scrapbookScene.classList.remove("hidden");

        updateNavigation();

    }, 500);

}


/* =====================================================
   BUILD THE ENTIRE BOOK
===================================================== */

function buildBook() {

    pagesContainer.innerHTML = "";


    /*
        Create every physical sheet now.

        We do NOT create pages during navigation.

        This is what prevents the merging problem.
    */

    for (
        let sheetNumber = 0;
        sheetNumber < TOTAL_SHEETS;
        sheetNumber++
    ) {

        const sheet = createSheet(sheetNumber);

        pagesContainer.appendChild(sheet);

    }


    updateStacks();

}


/* =====================================================
   CREATE ONE PHYSICAL SHEET
===================================================== */

function createSheet(sheetNumber) {

    const page = document.createElement("div");

    page.className = "page";

    /*
        Higher pages sit above lower pages.
    */

    page.style.setProperty(
        "--page-z",
        TOTAL_SHEETS - sheetNumber
    );


    /*
        Page numbers.

        Sheet 0:
            front = 1
            back = 2

        Sheet 1:
            front = 3
            back = 4

        etc.
    */

    const frontNumber =
        sheetNumber * 2 + 1;

    const backNumber =
        sheetNumber * 2 + 2;


    const front = document.createElement("div");

    front.className =
        "page-face page-front";


    front.innerHTML =
        createPageContent(frontNumber);


    const back = document.createElement("div");

    back.className =
        "page-face page-back";


    /*
        Don't create a fake page beyond TOTAL_PAGES.
    */

    if (backNumber <= TOTAL_PAGES) {

        back.innerHTML =
            createPageContent(backNumber);

    }


    page.appendChild(front);

    page.appendChild(back);


    return page;

}


/* =====================================================
   PAGE DESIGN
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
   NEXT
===================================================== */

nextButton.addEventListener(
    "click",
    nextSpread
);


function nextSpread() {

    if (!unlocked || turning) {
        return;
    }


    if (currentSheet >= TOTAL_SHEETS - 1) {

        return;

    }


    turning = true;


    /*
        The current top sheet flips.

        Because ALL sheets already exist,
        this is a real individual sheet.
    */

    const sheets =
        pagesContainer.querySelectorAll(".page");


    const sheet =
        sheets[currentSheet];


    sheet.classList.add("flipped");


    /*
        Move to the next spread.
    */

    currentSheet++;


    updateStacks();

    updateNavigation();


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

    if (!unlocked || turning) {
        return;
    }


    if (currentSheet <= 0) {

        return;

    }


    turning = true;


    /*
        The previous physical sheet
        rotates back.
    */

    currentSheet--;


    const sheets =
        pagesContainer.querySelectorAll(".page");


    const sheet =
        sheets[currentSheet];


    sheet.classList.remove("flipped");


    updateStacks();

    updateNavigation();


    setTimeout(() => {

        turning = false;

    }, 1300);

}


/* =====================================================
   PAGE STACK VISUALS
===================================================== */

function updateStacks() {

    /*
        LEFT STACK

        The further through the book we go,
        the thicker the left stack becomes.
    */

    const leftPages =
        currentSheet * 2;


    /*
        RIGHT STACK

        The remaining sheets become thinner.
    */

    const rightPages =
        TOTAL_SHEETS - currentSheet - 1;


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
   STACK THICKNESS
===================================================== */

function updateStackAppearance(
    stack,
    pageCount,
    side
) {

    /*
        Each page adds a tiny amount
        of visible thickness.
    */

    const thickness =
        Math.min(pageCount * 1.5, 18);


    if (side === "left") {

        stack.style.width =
            `${Math.max(thickness, 3)}px`;

        stack.style.left =
            `${-Math.max(thickness, 3)}px`;

    } else {

        stack.style.width =
            `${Math.max(thickness, 3)}px`;

        stack.style.right =
            `${-Math.max(thickness, 3)}px`;

    }

}


/* =====================================================
   NAVIGATION
===================================================== */

function updateNavigation() {

    previousButton.disabled =
        currentSheet <= 0;


    nextButton.disabled =
        currentSheet >= TOTAL_SHEETS - 1;


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


        if (event.key === "ArrowRight") {

            nextSpread();

        }


        if (event.key === "ArrowLeft") {

            previousSpread();

        }

    }
);
