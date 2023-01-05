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

const header = document.querySelector('.header')
let lastScrollTop
window.addEventListener('scroll', () => {
  const windowPos = (window.pageYOffset || document.scrollTop) || 0;

  if (windowPos >= (window.innerHeight / 2) && windowPos > lastScrollTop) {
    header.style.transform = 'translateY(-100%)'
  } else  {
    header.style.transform = ''
  }

  lastScrollTop = windowPos <= 0 ? 0 : windowPos;
})