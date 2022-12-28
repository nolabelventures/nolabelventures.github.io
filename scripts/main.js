gsap.registerPlugin(DrawSVGPlugin)

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-intro",
    start: "top",
    end: "bottom",
    pin: true,
    pinSpacing: true,
    scrub: true,
    snap: 0.5
  }
});

tl.to('.hero-intro--page-one', {
  autoAlpha: 0
})

tl.to('.hero-intro--page-two', {
  autoAlpha: 1
})

tl.fromTo(".draw-me", {drawSVG: "0%"}, {drawSVG: "-100%"});

tl.to('.logo-text', {
  fill: '#111111'
})

tl.to('.hero-intro--page-two', {
  backgroundColor: '#ffffff'
}, "<")