const cards = document.querySelectorAll(".card");
const modals = document.querySelectorAll(".modal");

cards.forEach(function (card){
    card.addEventListener("mouseover", function(){
        card.classList.add("hovered");
    });
    card.addEventListener("mouseout", function(){
        card.classList.remove("hovered");
    });
});

function setupCarousel(modal){
    const slides = modal.querySelectorAll(".slide");
    const dotsBox = modal.querySelector(".dots");
    const prevBtn = modal.querySelector(".prev-btn");
    const nextBtn = modal.querySelector(".next-btn");
    const closeBtn = modal.querySelector(".close-button");
    const card = document.getElementById("card" + modal.id.replace("modal", ""));
    const total = slides.length;
    let current = 0;

    slides.forEach(function (slide, i) {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.addEventListener("click", function(){
            current = i;
            update();
        });
        dotsBox.appendChild(dot);
    });
    const dots = dotsBox.querySelectorAll(".dot");

    function update(){
        slides.forEach(function (slide, i){
            const offset = (i - current + total) % total;
            if(offset === 0){
                slide.className = "slide active";
            } else if(offset === 1){
                slide.className = "slide next";
            } else if(offset === total - 1){
                slide.className = "slide prev";
            } else{
                slide.className = "slide";
            }
        });
        dots.forEach(function (dot, i){
            if(i === current){
                dot.className = "dot active";
            } else{
                dot.className = "dot";
            }
        });
    }

    function nextSlide() {
        current = (current + 1) % total;
        update();
    }

    function prevSlide(){
        current = (current - 1 + total) % total;
        update();
    }

    function openModal(){
        current = 0;
        update();
        modal.classList.add("open");
    }

    function closeModal(){
        modal.classList.remove("open");
    }

    card.addEventListener("click", openModal);
    card.addEventListener("keydown", function (event){
        if(event.key === "Enter"){
            openModal();
        }
    });

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
    closeBtn.addEventListener("click", closeModal);

    // click the dark background to close
    modal.addEventListener("click", function (event){
        if(event.target === modal){
            closeModal();
        }
    });

    // keyboard: arrows to move, Escape to close (only while this modal is open)
    document.addEventListener("keydown", function (event){
        if(!modal.classList.contains("open")){
            return;
        }

        if(event.key === "ArrowRight"){
            nextSlide();
        } else if(event.key === "ArrowLeft"){
            prevSlide();
        } else if(event.key === "Escape"){
            closeModal();
        }
    });
    update();
}

modals.forEach(function (modal){
    setupCarousel(modal);
});