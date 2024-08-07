
let images = [];
let pageNumber=1;
let PAGE_SIZE = 5;

const setLoading = (showSpinner) => {
    const spinner = document.getElementById("loadingmask");

    if (showSpinner) {
        spinner.style.display = "block";
        document.body.style.pointerEvents = "none";
        document.body.style.opacity = ".3";
    } else {
        spinner.style.display = "none";
        document.body.style.pointerEvents = "auto";
        document.body.style.opacity = "1";
    }
};

const renderImages = () => {
    const container = document.getElementById("container");
    const newItems = images.slice(- PAGE_SIZE);

    newItems.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.width = "800";
        img.height = "600";
        img.style.display = "block";
        img.style.margin = "1rem";
        container.appendChild(img);
    });
};

const getImages = (pageNo, pageSize) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const res = ["./assets/first.jpg", "./assets/second.jpg", "./assets/third.jpg", "./assets/fourth.jpg", "./assets/fifth.jpg"];
            resolve(res);
        }, 1000);
    });
};

const fetchImages = async (pageNo,pageSize) => {
    setLoading(true);
    const items = await getImages(1, pageSize);
    setLoading(false);
    images = [...images, ...items];

    renderImages();
};

document.onload=fetchImages()


//*this is important to implement infinite scroll */
window.addEventListener("scroll", () => {
    //reference for below formula https://www.educative.io/edpresso/how-to-implement-infinite-scrolling-in-javascript
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight-1 ) {
        fetchImages(++pageNumber,PAGE_SIZE);
    }
});
