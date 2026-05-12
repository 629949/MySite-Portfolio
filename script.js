// ========== NAVIGATION SCROLLING EFFECTS ==========
let mylogo = document.querySelector(".logo");
let navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        mylogo.style.color = "var(--primary-color)";
        navbar.classList.add("scrolled");
    } else {
        mylogo.style.color = "white";
        navbar.classList.remove("scrolled");
    }
});

// ========== SCROLL UP BUTTON ==========
let scrollUp = document.querySelector(".scroll-up");

window.addEventListener("scroll", () => {
    let scrollpercentage =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    if (scrollpercentage > 30) {
        scrollUp.style.display = "flex";
    } else {
        scrollUp.style.display = "none";
    }
});

// Fixed: Changed AddEventListner to addEventListener
scrollUp.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// ========== SMOOTH SCROLL NAVIGATION LINKS ==========
document.querySelectorAll("nav a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// ========== CONTACT FORM SUBMISSION ==========
document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector("button");
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { Accept: "application/json" },
        });

        if (response.ok) {
            // Show success popup
            const popup = document.getElementById("popup");
            popup.textContent = "✓ Message sent successfully!";
            popup.classList.remove("hidden");
            form.reset();

            // Hide popup after 3 seconds
            setTimeout(() => {
                popup.classList.add("hidden");
            }, 3000);
        } else {
            alert("Something went wrong. Try again.");
        }
    } catch (error) {
        alert("Network error. Please try again.");
        console.error("Error:", error);
    } finally {
        // Restore button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// ========== ADD SUBTLE ANIMATION ON PAGE LOAD ==========
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

// ========== PARALLAX EFFECT (Optional Enhancement) ==========
window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll("[data-parallax]");

    parallaxElements.forEach(element => {
        let speed = element.getAttribute("data-parallax") || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========== LINK SMOOTH SCROLL FOR FOOTER LINKS ==========
document.querySelectorAll("footer a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        if (this.getAttribute("href") === "#contact") {
            e.preventDefault();
            document.querySelector(".form-container").scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// ========== ANIMATE ON SCROLL ENHANCEMENT ==========
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 100,
    });
}
