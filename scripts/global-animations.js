gsap.registerPlugin(DrawSVGPlugin, SplitText);

gsap.defaults({
  ease: "Power4.easeInOut",
});

/* FOOTER */
const footer = document.querySelector("footer");
const footertl = gsap.timeline({
  scrollTrigger: {
    trigger: footer,
    start: "top bottom",
    end: "bottom bottom",
    scrub: true,
  },
});

footertl.from("footer .bottom-letter", {
    x: 100,
}, "<");

footertl.from("footer .top-letter", {
  x: -100,
}, "<");


const footerLinks = document.querySelector('.footer__links')
let isVisible = false
document.querySelector('.footer-menu-button').addEventListener('click', () => {
  footerLinks.classList.add('show')
})

document.querySelector('.footer__links-close-button').addEventListener('click', () => {
  footerLinks.classList.remove('show')
})

window.addEventListener('resize', () => {
  if (window.innerWidth >= 976) {
    footerLinks.classList.remove('active') 
    isVisible = false
  }
})