gsap.defaults({
  ease: 'power4.out'
})

const header = document.querySelector('header')

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

footertl.from(
  "footer .bottom-letter",
  {
    x: 100,
  },
  "<"
);

footertl.from(
  "footer .top-letter",
  {
    x: -100,
  },
  "<"
);

if (window.location.pathname === "/") {
  let lastScrollTop;
  window.addEventListener("scroll", () => {
    const windowPos = window.pageYOffset || document.scrollTop || 0;

    if (windowPos >= window.innerHeight / 2 && windowPos > lastScrollTop) {
      header.classList.add('hide')
    } else {
      header.classList.remove('hide')
    }

    // used to detect scroll position
    lastScrollTop = windowPos <= 0 ? 0 : windowPos;
  });
}

document.querySelector(".header__menu-button").addEventListener("click", () => {
  header.classList.add("show-mobile-menu");
});
document
  .querySelector(".header__menu-button-close")
  .addEventListener("click", () => {
    header.classList.remove("show-mobile-menu");
  });

document.querySelector('.copy-year').innerText = new Date().getFullYear()
