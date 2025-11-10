

let mylogo = document.querySelector(".logo");

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 350){
        mylogo.style.color = "black";
    } else {
        mylogo.style.color = "white";
    }

     if(window.scrollY > 350){
        document.querySelector("nav").style.color = "red";
    } else {
        document.querySelector("nav").style.color = "black";
    }
}
)


let scrollUp = document.querySelector(".scroll-up");

window.addEventListener("scroll", ()=>{

    let scrollpercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    if(scrollpercentage > 30){
        scrollUp.style.display = "block";
    } else {
        scrollUp.style.display = "none";
    }
}
)

scrollUp.AddEventListner("click", ()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

let nav = document.getElementById("navbar");

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 350){
        nav.style.backgroundColor = "white";
    } else {
        nav.style.backgroundColor = document.body.style.backgroundColor;
    }
}
)