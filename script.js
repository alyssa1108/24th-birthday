/* =========================================
   MEMORY BOOK
   MAIN BOOK ENGINE
========================================= */


// ==========================================
// ELEMENTS
// ==========================================

const closedBook = document.getElementById("closedBook");

const openBookButton = document.getElementById("openBookButton");

const bookScene = document.getElementById("bookScene");

const passwordPage = document.getElementById("passwordPage");

const scrapbookContent = document.getElementById("scrapbookContent");

const passwordInput = document.getElementById("passwordInput");

const unlockButton = document.getElementById("unlockButton");

const passwordError = document.getElementById("passwordError");

const nextButton = document.getElementById("nextButton");

const previousButton = document.getElementById("previousButton");

const pageCounter = document.getElementById("pageCounter");

const flipContainer = document.getElementById("flipContainer");


// ==========================================
// PASSWORD
// ==========================================

const CORRECT_PASSWORD = "JoashManicum";

let unlocked = false;


// ==========================================
// PAGE SYSTEM
// ==========================================

let currentPage = 0;

const totalPages = 10;

let isAnimating = false;


// ==========================================
// OPEN THE BOOK
// ==========================================

openBookButton.addEventListener("click", openBook);


function openBook() {

    if (openBookButton.classList.contains("opening")) {
        return;
    }

    openBookButton.classList.add("opening");

    setTimeout(() => {

        closedBook.classList.add("hidden");

        bookScene.classList.remove("hidden");

        setTimeout(() => {
            passwordInput.focus();
        }, 700);

    }, 1100);

}


// ==========================================
// PASSWORD UNLOCK
// ==========================================

unlockButton.addEventListener("click", checkPassword);


passwordInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkPassword();
    }

});


function checkPassword() {

    const enteredPassword = passwordInput.value;

    if (enteredPassword === CORRECT_PASSWORD) {

        unlocked = true;

        passwordError.classList.remove("show");

        passwordPage.style.animation = "pageAppear .8s ease reverse";

        setTimeout(() => {

            passwordPage.classList.add("hidden");

            scrapbookContent.classList.remove("hidden");

            currentPage = 1;

            updateNavigation();

        }, 500);

    } else {

        passwordError.classList.remove("show");

        // Force animation to restart
        void passwordError.offsetWidth;

        passwordError.classList.add("show");

        passwordInput.value = "";

        passwordInput.focus();

    }

}


// ==========================================
// NEXT PAGE
// ==========================================

nextButton.addEventListener("click", nextPage);


function nextPage() {

    if (!unlocked || isAnimating) {
        return;
    }

    if (currentPage >= totalPages) {
        return;
    }

    isAnimating = true;

    createFlipPage();

    currentPage++;

    updateNavigation();

    setTimeout(() => {

        isAnimating = false;

    }, 1300);

}


// ==========================================
// PREVIOUS PAGE
// ==========================================

previousButton.addEventListener("click", previousPage);


function previousPage() {

    if (!unlocked || isAnimating) {
        return;
    }

    if (currentPage <= 1) {
        return;
    }

    isAnimating = true;

    const pages = flipContainer.querySelectorAll(".flip-page");

    const lastPage = pages[pages.length - 1];

    if (lastPage) {

        lastPage.classList.remove("flipped");

        setTimeout(() => {

            lastPage.remove();

        }, 1250);

    }

    currentPage--;

    updateNavigation();

    setTimeout(() => {

        isAnimating = false;

    }, 1300);

}


// ==========================================
// CREATE A PAGE THAT FLIPS
// ==========================================

function createFlipPage() {

    const flipPage = document.createElement("div");

    flipPage.className = "flip-page";


    // ======================================
    // FRONT OF PAGE
    // ======================================

    const front = document.createElement("div");

    front.className = "flip-front";

    front.innerHTML = createPageDesign(
        currentPage
    );


    // ======================================
    // BACK OF PAGE
    // ======================================

    const back = document.createElement("div");

    back.className = "flip-back";

    back.innerHTML = createPageDesign(
        currentPage + 1
    );


    flipPage.appendChild(front);

    flipPage.appendChild(back);

    flipContainer.appendChild(flipPage);


    // Allow browser to render before animation
    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            flipPage.classList.add("flipped");

        });

    });

}


// ==========================================
// PLACEHOLDER PAGE DESIGN
// ==========================================

function createPageDesign(pageNumber) {

    return `

        <div
            style="
                position:absolute;
                inset:0;
                padding:8%;
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:column;
                text-align:center;
            "
        >

            <div
                style="
                    position:absolute;
                    top:18px;
                    left:22px;
                    color:#c9a24b;
                    font-size:42px;
                    transform:rotate(-25deg);
                "
            >
                ❦
            </div>

            <div
                style="
                    position:absolute;
                    top:18px;
                    right:22px;
                    color:#c9a24b;
                    font-size:42px;
                    transform:rotate(25deg);
                "
            >
                ❦
            </div>

            <div
                style="
                    position:absolute;
                    bottom:18px;
                    left:22px;
                    color:#c9a24b;
                    font-size:42px;
                    transform:rotate(-155deg);
                "
            >
                ❦
            </div>

            <div
                style="
                    position:absolute;
                    bottom:18px;
                    right:22px;
                    color:#c9a24b;
                    font-size:42px;
                    transform:rotate(155deg);
                "
            >
                ❦
            </div>


            <div
                style="
                    color:#85682e;
                    letter-spacing:2px;
                    font-size:16px;
                    text-transform:uppercase;
                    margin-bottom:10px;
                "
            >
                A memory to keep
            </div>


            <div
                style="
                    font-family:'Great Vibes',cursive;
                    font-size:48px;
                    color:#49361f;
                "
            >
                Our Memory
            </div>


            <div
                style="
                    color:#c9a24b;
                    font-size:22px;
                    margin:12px 0;
                    letter-spacing:5px;
                "
            >
                ❧ ❦ ❧
            </div>


            <div
                style="
                    width:210px;
                    height:250px;
                    background:linear-gradient(135deg,#d4c8ad,#eee5d0);
                    border:10px solid #f7f1e3;
                    box-shadow:0 8px 15px rgba(60,40,20,.25);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    transform:rotate(-2deg);
                    color:#8e7d61;
                    letter-spacing:2px;
                    font-size:14px;
                "
            >
                PHOTO ${pageNumber}
            </div>


            <div
                style="
                    margin-top:15px;
                    color:#80652e;
                    font-size:17px;
                    font-style:italic;
                "
            >
                Your date goes here
            </div>


            <p
                style="
                    margin-top:12px;
                    max-width:320px;
                    font-size:19px;
                    line-height:1.5;
                "
            >
                Your story, your photographs and
                your memories will live on this page.
            </p>

        </div>

    `;

}


// ==========================================
// NAVIGATION
// ==========================================

function updateNavigation() {

    if (!unlocked) {

        previousButton.disabled = true;

        nextButton.disabled = true;

        pageCounter.textContent = "Password";

        return;
    }


    previousButton.disabled = currentPage <= 1;

    nextButton.disabled = currentPage >= totalPages;


    pageCounter.textContent =
        `Page ${currentPage} of ${totalPages}`;

}


// ==========================================
// INITIAL STATE
// ==========================================

updateNavigation();
