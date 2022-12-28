gsap.registerPlugin(DrawSVGPlugin, SplitText)

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
  autoAlpha: 1
})

intro.fromTo(".draw-me", {drawSVG: "0%"}, {drawSVG: "-100%"});

const factsIntro = gsap.timeline({
  scrollTrigger: {
    trigger: '.facts',
    start: "center bottom",
    end: 'top top',
    scrub: true,
    once:true,
  }
})

factsIntro.from('.facts__content-title', {
  autoAlpha: 0
})

var sectionOneText = new SplitText(document.getElementsByClassName('facts__content-text')[0], {type: 'words'});
factsIntro.from(sectionOneText.words, {
  y: 20,
  autoAlpha: 0,
  stagger: 0.5
})

/* FACTS HORIZONTAL SCROLL SECTION */
let Sections = gsap.utils.toArray(".facts__section");
const track = document.querySelector('.facts-track')
const factsTrack = gsap.timeline({
  scrollTrigger: {
    trigger: ".facts-track",
    start: "0% 0%",
    end: () => `+=${Sections[0].offsetWidth * Sections.length  - window.innerWidth}`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    invalidateOnRefresh: true,
    anticipatePin: true
  }
})


factsTrack.addLabel('startScroll')

factsTrack.to(track, {
  x: () => `-${Sections[0].offsetWidth * Sections.length - window.innerWidth}`,
})

let sectionTwoIn = gsap.timeline({
  scrollTrigger: {
    trigger: Sections[1],
    scrub: 1,
    start: 'top top-=' + Sections[0].offsetWidth * 3,
    end: '+=' + Sections[0].offsetWidth * 4,
  }
})

sectionTwoIn.from(Sections[1].querySelector('h2'), {
  autoAlpha: 0,
})


const aboutSection = gsap.timeline({
  scrollTrigger: {
    trigger: ".about",
    start: "top",
    end: "bottom",
    pin: true,
    pinSpacing: true,
    scrub: true,
  }
})

aboutSection.from('.about', {
  autoAlpha: 0
})

const aboutSections = gsap.utils.toArray(".about-content > div")
aboutSection.from(aboutSections[0], {
  y: 100,
  autoAlpha: 0
})
aboutSection.to(aboutSections[0], {
  autoAlpha: 0
})

aboutSection.from(aboutSections[1], {
  y: 100,
  autoAlpha: 0
})
aboutSection.to(aboutSections[1], {
  autoAlpha: 0
})
