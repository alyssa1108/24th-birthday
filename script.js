```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SETTINGS
    ===================================================== */

    const PASSWORD = "JoashManicum";
    const TOTAL_PAGES = 10;
    const TOTAL_SHEETS = Math.ceil(TOTAL_PAGES / 2);


    /* =====================================================
       GET ELEMENTS
    ===================================================== */

    const closedBook = document.getElementById("closedBook");
    const cover = document.getElementById("cover");

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


    /* =====================================================
       OPEN GREEN COVER
    ===================================================== */

    cover.addEventListener("click", () => {

        if (cover.classList.contains("opening")) {
            return;
        }

        cover.classList.add("opening");

        setTimeout(() => {

            closedBook.classList.add("hidden");

            passwordScene.classList.remove("hidden");

            setTimeout(() => {

                passwordInput.focus();

            }, 500);

        }, 1100);

    });


    /* =====================================================
       PASSWORD
    ===================================================== */

    unlockButton.addEventListener("click", unlockBook);

    passwordInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            unlockBook();
        }

    });


    function unlockBook() {

        if (passwordInput.value !== PASSWORD) {

            passwordError.classList.remove("show");

            void passwordError.offsetWidth;

            passwordError.classList.add("show");

            passwordInput.value = "";

            passwordInput.focus();

            return;
        }


        unlocked = true;

        passwordScene.classList.add("hidden");

        buildBook();

        setTimeout(() => {

            scrapbookScene.classList.remove("hidden");

            updateNavigation();

        }, 500);

    }


    /* =====================================================
       BUILD THE SCRAPBOOK
    ===================================================== */

    function buildBook() {

        pagesContainer.innerHTML = "";

        currentSheet = 0;


        for (
            let i = 0;
            i < TOTAL_SHEETS;
            i++
        ) {

            pagesContainer.appendChild(
                createSheet(i)
            );

        }


        updateSheetLayers();

        updateStacks();

    }


    /* =====================================================
       CREATE ONE PHYSICAL SHEET
    ===================================================== */

    function createSheet(sheetNumber) {

        const sheet =
            document.createElement("div");

        sheet.className = "page";


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
            titles[pageNumber - 1] || "Our Story";


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
       SHEET LAYERS
    ===================================================== */

    function updateSheetLayers() {

        const sheets =
            pagesContainer.querySelectorAll(".page");


        sheets.forEach((sheet, index) => {

            if (index < currentSheet) {

                sheet.style.zIndex =
                    10 + index;

            } else {

                sheet.style.zIndex =
                    100 + (TOTAL_SHEETS - index);

            }

        });

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


        if (
            currentSheet >=
            TOTAL_SHEETS - 1
        ) {
            return;
        }


        turning = true;


        const sheets =
            pagesContainer.querySelectorAll(".page");


        const sheet =
            sheets[currentSheet];


        sheet.style.zIndex = 1000;

        sheet.classList.add("flipped");


        currentSheet++;


        setTimeout(() => {

            updateSheetLayers();
            updateStacks();
            updateNavigation();

        }, 650);


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


        currentSheet--;


        const sheets =
            pagesContainer.querySelectorAll(".page");


        const sheet =
            sheets[currentSheet];


        sheet.style.zIndex = 1000;

        sheet.classList.remove("flipped");


        setTimeout(() => {

            updateSheetLayers();
            updateStacks();
            updateNavigation();

        }, 650);


        setTimeout(() => {

            turning = false;

        }, 1300);

    }


    /* =====================================================
       STACKS
    ===================================================== */

    function updateStacks() {

        const leftPages =
            currentSheet * 2;

        const rightPages =
            TOTAL_SHEETS -
            currentSheet -
            1;


        updateStack(
            leftStack,
            leftPages,
            "left"
        );

        updateStack(
            rightStack,
            rightPages,
            "right"
        );

    }


    function updateStack(
        stack,
        pageCount,
        side
    ) {

        const thickness =
            Math.max(
                3,
                Math.min(
                    pageCount * 1.5,
                    18
                )
            );


        stack.style.width =
            thickness + "px";


        if (side === "left") {

            stack.style.left =
                -thickness + "px";

        } else {

            stack.style.right =
                -thickness + "px";

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


        const firstPage =
            currentSheet * 2 + 1;

        const secondPage =
            Math.min(
                currentSheet * 2 + 2,
                TOTAL_PAGES
            );


        pageCounter.textContent =
            `${firstPage}–${secondPage} / ${TOTAL_PAGES}`;

    }


    /* =====================================================
       KEYBOARD
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

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

});
```

