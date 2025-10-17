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
const containerWidth = document.getElementById('slider');
const sliderImage = document.querySelectorAll('#logoSlide');


sliderImage.forEach((logo, index) => {
  let x = index * (logo.offsetWidth + 40); // 40 = space between logos
  function move() {
    x -= 1; // speed
    if (x <= -logo.offsetWidth) {
      x = containerWidth; // reset to right side
    }
    logo.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(move);
  }
  move();
});


//repsonsive nav bar
  
