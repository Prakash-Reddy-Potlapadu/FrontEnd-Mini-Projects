let images, interval, imageNumber=1;

window.addEventListener("load", () => {
    images = document.getElementsByClassName("carousel-image");
    interval = setInterval(slideLeft, 1000); // to change
    
});

function slideLeft() {
    const first = document.getElementById("first");
    const second = document.getElementById("second");
    const third = document.getElementById("third");
    const fourth = document.getElementById("fourth");
    const fifth = document.getElementById("fifth");
        imageNumber++;
        if(imageNumber>5){
            imageNumber=1;
        }
        for (let img of images) {
            let translate;

            switch(imageNumber){
                case 1:
                    translate="translateX(0%)";
                    first.classList.add("active");
                    second.classList.remove("active");
                    third.classList.remove("active");
                    fourth.classList.remove("active");
                    fifth.classList.remove("active");
                    break;
                case 2:
                    translate="translateX(-100%)";
                    second.classList.add("active");
                    first.classList.remove("active");
                    third.classList.remove("active");
                    fourth.classList.remove("active");
                    fifth.classList.remove("active");
                    break;
                case 3:
                    translate="translateX(-200%)";
                    third.classList.add("active");
                    first.classList.remove("active");
                    second.classList.remove("active");
                    fourth.classList.remove("active");
                    fifth.classList.remove("active");
                    break;
                    break;
                case 4:
                    translate="translateX(-300%)";
                    fourth.classList.add("active");
                    first.classList.remove("active");
                    second.classList.remove("active");
                    third.classList.remove("active");
                    fifth.classList.remove("active");
                    break;
                 case 5:
                    translate="translateX(-400%)";
                    fifth.classList.add("active");
                    first.classList.remove("active");
                    second.classList.remove("active");
                    third.classList.remove("active");
                    fourth.classList.remove("active");
                    break;
               

            }

            img.style.transform = translate;
        }
}


document.getElementsByClassName("carousel-container")[0].addEventListener("mouseenter", () => {
    clearInterval(interval);
});
document.getElementsByClassName("carousel-container")[0].addEventListener("mouseleave", () => {
    interval = setInterval(slideLeft, 1000);
});

function handlecarouselIndexClick(event) {
    const id = event.target.id;
    switch (id) {
        case "first":
            imageNumber = 0;
            slideLeft();
            break;
        case "second":
            imageNumber = 1;
            slideLeft();
            break;
        case "third":
            imageNumber = 2;
            slideLeft();
            break;
        case "fourth":
            imageNumber = 3;
            slideLeft();
            break;
        case "fifth":
            imageNumber = 4;
            slideLeft();
            break;
        default:
            break;
    }
}
