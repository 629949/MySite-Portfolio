let scrollbtn = document.getElementById("scrollbtn");
scrollbtn.addEventListener("click", function() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
});




let sendBtn = document.querySelector("#sendMsg");
sendBtn.addEventListener("click", () => {
    window.alert("Message sent");



})


//this is the slider 


//repsonsive nav bar
  
 const menuBtn = document.getElementById("menuBtn");
  const items = document.getElementById("menuitems");

  menuBtn.addEventListener("click", () => {
    items.classList.toggle("hidden");

    console.log("clicked");
  });


  let splash = document.getElementById("splash");
  document.addEventListener('DOMContentLoaded', (e) =>{
   
    setTimeout(() => {
      splash.style.opacity = '0';
    }, 2000);

  })