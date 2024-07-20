function onOpenModalClick() {
    document.getElementById("modal").style.display = "block";
    document.body.style.backgroundColor = "#dfdfdf";
    document.body.style.pointerEvents = "none";
    document.getElementById("modal").style.pointerEvents = "all";
}

function onCloseModalClick() {
    document.getElementById("modal").style.display = "none";
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.pointerEvents = "all";
}
