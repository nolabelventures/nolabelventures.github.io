gsap.registerPlugin(DrawSVGPlugin, SplitText)

gsap.defaults({
  ease: 'Power4.easeInOut'
})

function isInViewport(element) {
  console.log(window.pageYOffset, 0, element.offsetTop);
  return (
     - (document.clientTop || 0)  >= element.offsetTop
  );
}

const introLink = document.querySelector('.nav__button[href="#intro"]')
const introSection = document.getElementById('intro')
const portfolioLink = document.querySelector('.nav__button[href="#portfolio"]')
const portfolioSection = document.getElementById('portfolio')
const aboutLink = document.querySelector('.nav__button[href="#about"]')
const aboutSection = document.getElementById('about')

window.addEventListener('scroll', function() {
  const windowPos = (window.pageYOffset || document.scrollTop);

  [introLink, portfolioLink, aboutLink].forEach(link => { 
    const refElement = document.getElementById(link.href.split('#')[1]);
    link.classList.toggle('active', refElement.offsetTop <= windowPos && refElement.offsetTop + refElement.clientHeight >= windowPos)
  });
})

const dropdowns = gsap.utils.toArray('[data-dropdown]')
dropdowns.forEach(dropdown => {
  const content = dropdown.nextSibling.nextSibling
  content.style.display = 'none'
  const text = content.querySelector('div')
  dropdown.addEventListener('click', (e) => {
    const button = e.currentTarget
    setTimeout(() => {
      content.style.display = content.style.display === 'none' ? 'block' : 'none'
      button.classList.toggle('dropdown-active', content.style.display === 'block')
    }, content.style.display === 'none' ? 0 : 300)

    gsap.fromTo(text, {
      x: content.style.display === 'none' ? 10 : 0,
      autoAlpha: content.style.display === 'none' ? 0 : 1
    }, {
      x: content.style.display === 'none' ? 0 : 10,
      autoAlpha: content.style.display === 'none' ? 1 : 0
    })
  })
})

gsap.fromTo('.hero-intro h1', {
  autoAlpha: 0,
  scale: 1.1
}, {
  autoAlpha: 1,
  scale: 1
})

let intro = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-intro",
    start: "top",
    end: "bottom",
    pin: true,
    pinSpacing: true,
    scrub: true,
    snap: 0.5,
  }
});

intro.to('.hero-intro--page-one', {
  autoAlpha: 0,
})

intro.to('.hero-intro--page-two', {
  autoAlpha: 1,
})

intro.from('.hero-intro--page-two .bottom-letter', {
  x: 100
}, '<')

intro.from('.hero-intro--page-two .top-letter', {
  x: -100
}, '<')

intro.from('.ventures path', {
  autoAlpha: 0,
  y: -100,
  stagger: 0.05
})

intro.fromTo(".draw-me", {drawSVG: "0%"}, {drawSVG: "-100%"});


/* FACTS HORIZONTAL SCROLL SECTION */
let Sections = gsap.utils.toArray(".facts__section");
const track = document.querySelector('.facts-track')

const sectionOneText = new SplitText(Sections[0].querySelector('.facts__content-text'), {type: 'words'});
const sectionOneTextIn = gsap.from(sectionOneText.words, {
  y: 20,
  autoAlpha: 0,
  stagger: 0.05,
  paused: true
})

const sectionOneHeading = new SplitText(Sections[0].querySelector('.facts__content-title'), {type: 'chars'});
gsap.from(sectionOneHeading.chars, {
  autoAlpha: 0,
  y: 20,
  stagger: 0.05,
  onStart: () => {
    sectionOneTextIn.play()
  },
  scrollTrigger: {
    trigger: '.facts',
    start: "center bottom",
    end: 'top top',
    scrub: true,
    ease: 'Power4.out',
    once: true
  }
})

const horizontalScroll = gsap.to('.facts-track', {
  xPercent: -100 * (Sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: ".facts",
    end: `+=${Sections[0].offsetWidth * Sections.length}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
  }
})

var sectionTwoText = new SplitText(Sections[1].querySelector('.facts__content-text'), {type: 'words'});
const sectionTwoTextIn = gsap.from(sectionTwoText.words, {
  y: 20,
  autoAlpha: 0,
  stagger: 0.05,
  paused: true
})
var sectionTwoHeading = new SplitText(Sections[1].querySelector('.facts__content-title'), {type: 'chars'});
gsap.from(sectionTwoHeading.chars, {
  autoAlpha: 0,
  y: 20,
  ease: 'none',
  stagger: 0.05,
  scrollTrigger: {
    trigger: Sections[1].querySelector('h2'),
    start: 'left 80%',
    end: 'left center',
    scrub: 1,
    containerAnimation: horizontalScroll,
    once: true
  },
  onStart: () => {
    sectionTwoTextIn.play()
  }
})

/* PORTFOLIO SECTION */
const portfolio = gsap.timeline({
  scrollTrigger: {
    trigger: '.portfolio',
    start: "top center",
    end: "+=300",
    scrub: true,
    once: true
  }
})

portfolio.from('.portfolio-link__wrapper', {
  y: 30,
  autoAlpha: 0,
  stagger: 0.5
})

/* ABOUT SECTION */
const about = gsap.timeline({
  scrollTrigger: {
    trigger: ".about",
    start: "top",
    end: "bottom",
    pin: true,
    pinSpacing: true,
    scrub: 2,
    ease: 'Power4.inOut'
  }
})

gsap.from('.about', {
  autoAlpha: 0,
  filter: 'blur(50px)',
  scrollTrigger: {
    trigger: '.about', 
    start: 'top bottom',
    end: 'top top',
    scrub: 1,
  }
})

const aboutSections = gsap.utils.toArray(".about-content > div")
about.from(aboutSections[0], {
  y: 100,
  autoAlpha: 0
})


about.to('.ramzi-image', {
  rotateY: 90,
  rotateX: -90
})

about.to('.founder .about-content__content', {
  autoAlpha: 1
}, '<')

about.to('.founder .about-content__content', {
  autoAlpha: 0,
  x: 10
}, '<')

about.from('.community-image', {
  rotateY: 90,
  rotateX: 90,
  autoAlpha: 0
})

about.from('.community .about-content__content', {
  autoAlpha: 0,
  x: 10
}, "<")

const footer = document.querySelector('footer')
console.log(footer);
const footertl = gsap.timeline({
  scrollTrigger: {
    trigger: footer,
    start: 'top bottom',
    end: 'bottom bottom',
    scrub: true
  }
})

footertl.from('footer .bottom-letter', {
  x: 100
}, '<')

footertl.from('footer .top-letter', {
  x: -100
}, '<')
