let scrollbtn = document.getElementById("scrollbtn");
scrollbtn.addEventListener("click", function() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
});

