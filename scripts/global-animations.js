gsap.defaults({
  ease: "power4.out",
});

const header = document.querySelector("header");

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
  footer.querySelector(".bottom-letter"),
  {
    x: 100,
  },
  "<"
);

footertl.from(
  footer.querySelector(".top-letter"),
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
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }

    if (windowPos >= window.innerHeight) {
      header.classList.add("show-logo");
    } else {
      header.classList.remove("show-logo");
    }

    // used to detect scroll position
    lastScrollTop = windowPos <= 0 ? 0 : windowPos;
  });
}

const headerMenu = document.querySelector(".header__mobile-menu");
const headerAnimation = gsap.timeline({ paused: true });

headerAnimation.from(".header__mobile-menu", {
  autoAlpha: 0,
});

headerAnimation.from(
  ".header__mobile-menu a",
  {
    y: "100%",
    autoAlpha: 0,
    stagger: 0.05,
  },
  "<"
);

document.querySelector(".header__menu-button").addEventListener("click", () => {
  document.documentElement.style.overflow = "hidden";
  header.classList.add("show-mobile-menu");
  headerAnimation.play();
});
document
  .querySelector(".header__menu-button-close")
  .addEventListener("click", () => {
    document.documentElement.style.overflow = "";
    gsap.to(".header__mobile-menu", {
      autoAlpha: 0,
      onComplete: () => {
        headerAnimation.seek(0);
        headerAnimation.pause();
        header.classList.remove("show-mobile-menu");
        header.classList.remove("hide");
      },
    });
  });

document.querySelector(".copy-year").innerText = new Date().getFullYear();

const cookieNotice = document.querySelector(".cookie-notice");
if (window.location.pathname !== "/") {
  if (!localStorage["cookie_dismissed"]) {
    gsap.to(cookieNotice, {
      autoAlpha: 1,
    });
  }
}

cookieNotice
  .querySelector(".cookie-notice__accept")
  .addEventListener("click", () => {
    localStorage.setItem("cookie_dismissed", true);
    dataLayer.push("config", "G-ZK3Q35ZF40", {
      anonymize_ip: true,
      page_title: document.title,
      page_location: window.location.href,
    });

    gsap.to(cookieNotice, {
      autoAlpha: 0,
    });
  });
