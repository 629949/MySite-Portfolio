"use strict";

document.documentElement.classList.add("js");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.getElementById("nav-links");
menuToggle.hidden = false;
function closeMenu() {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
}
menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navigation.classList.toggle("open", !expanded);
});
navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
    }
});
window.matchMedia("(max-width: 680px)").addEventListener("change", closeMenu);
document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contact-form");
const status = document.getElementById("form-status");
contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button");
    if (button.disabled) return;
    const originalContent = button.innerHTML;
    button.disabled = true;
    button.textContent = "Sending…";
    status.classList.remove("error");
    status.textContent = "Sending your message…";
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { Accept: "application/json" },
            signal: controller.signal,
        });
        if (!response.ok) throw new Error("Submission failed");
        status.textContent = "Thanks for reaching out! Your message has been sent.";
        contactForm.reset();
    } catch {
        status.classList.add("error");
        status.textContent = "Couldn’t confirm delivery. Please try again or email gademma54@gmail.com. Your message is still here.";
    } finally {
        window.clearTimeout(timeout);
        button.disabled = false;
        button.innerHTML = originalContent;
    }
});

// Enhance shared pages without making their content depend on JavaScript.
const pageName = window.location.pathname.split("/").pop();
document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.getAttribute('href') === pageName) link.setAttribute('aria-current', 'page');
});
const printButton = document.querySelector('.print-button');
if (printButton) {
    printButton.hidden = false;
    printButton.addEventListener('click', () => window.print());
}

const filters = document.querySelector('.filter-group');
if (filters) {
    filters.hidden = false;
    const projects = [...document.querySelectorAll('[data-category]')];
    filters.addEventListener('click', (event) => {
        const button = event.target.closest('[data-filter]');
        if (!button) return;
        filters.querySelectorAll('button').forEach((item) => {
            item.setAttribute('aria-pressed', String(item === button));
        });
        projects.forEach((project) => {
            project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
        });
        const grid = document.querySelector('.project-grid');
        grid.hidden = ![...grid.querySelectorAll('[data-category]')].some((project) => !project.hidden);
        document.getElementById('filter-status').textContent = button.dataset.filter === 'all' ? 'Showing all projects' : `Showing ${button.textContent.trim().toLowerCase()} projects`;
    });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
let manuallyPaused = false;
try { manuallyPaused = localStorage.getItem('gad-motion-paused') === 'true'; } catch { /* Storage may be unavailable in private browsing. */ }
let motionPaused = reducedMotion.matches || manuallyPaused;
function syncMotion() {
    motionPaused = reducedMotion.matches || manuallyPaused;
    document.documentElement.classList.toggle('motion-paused', motionPaused);
    if (!motionButton) return;
    motionButton.hidden = false;
    motionButton.disabled = reducedMotion.matches;
    motionButton.setAttribute('aria-pressed', String(motionPaused));
    motionButton.querySelector('span').textContent = reducedMotion.matches ? 'Reduced motion' : motionPaused ? 'Resume motion' : 'Pause motion';
}
syncMotion();
reducedMotion.addEventListener('change', syncMotion);
motionButton?.addEventListener('click', () => {
    manuallyPaused = !manuallyPaused;
    try { localStorage.setItem('gad-motion-paused', String(manuallyPaused)); } catch { /* Keep the preference for this visit. */ }
    syncMotion();
});

// Reveals start only when visible; content is never hidden while waiting for JS.
if ('IntersectionObserver' in window) {
    const reveals = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            if (!motionPaused) entry.target.classList.add('reveal-in');
            reveals.unobserve(entry.target);
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section-heading, .project, .about-copy, .detail-card, .timeline-item, .case-statement').forEach((item) => reveals.observe(item));
    const art = document.querySelector('.hero-art');
    if (art) {
        const artworkVisibility = new IntersectionObserver(([entry]) => {
            art.querySelectorAll('.sculpture, .floating-label').forEach((item) => {
                item.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
            });
        });
        artworkVisibility.observe(art);
    }
}
const art = document.querySelector('.hero-art');
if (art) {
    art.addEventListener('pointermove', (event) => {
        if (motionPaused || event.pointerType !== 'mouse') return;
        const bounds = art.getBoundingClientRect();
        art.style.setProperty('--tilt-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 18}deg`);
        art.style.setProperty('--tilt-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * -14}deg`);
    });
    art.addEventListener('pointerleave', () => {
        art.style.setProperty('--tilt-x', '0deg');
        art.style.setProperty('--tilt-y', '0deg');
    });
}
const progress = document.querySelector('.reading-progress');
if (progress) {
    let scheduled = false;
    const updateProgress = () => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, window.scrollY / distance) : 0})`;
        scheduled = false;
    };
    window.addEventListener('scroll', () => {
        if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateProgress); }
    }, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
}
