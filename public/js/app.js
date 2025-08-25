// Toggle mobile nav + header style on scroll
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));


// Optional: add a class when scrolled for subtle shadow, if needed
window.addEventListener('scroll', () => {
const header = document.querySelector('.site-header');
if (!header) return;
header.style.boxShadow = window.scrollY > 4 ? '0 6px 20px rgba(2,6,23,.06)' : 'none';
});