window.addEventListener("load", () => {
  const dropdowns = gsap.utils.toArray("[data-dropdown]");
  dropdowns.forEach((dropdown) => {
    const content = dropdown.nextSibling.nextSibling;
    const contentHeight = content.clientHeight;
    content.style.height = 0;

    dropdown.addEventListener("click", (e) => {
      const button = e.currentTarget;

      dropdowns.forEach((dd) => {
        gsap.to(dd.nextSibling.nextSibling, {
          height: 0,
        });

        dd.classList.remove("dropdown-active");
      });

      if (content.style.height !== "0px") {
        button.classList.remove("dropdown-active");

        gsap.to(content, {
          height: 0,
        });
      } else {
        button.classList.add("dropdown-active");

        gsap.to(content, {
          height: contentHeight + "px",
        });
      }
    });
  });
});

/*
 * FAQ Dropdowns
 */
const hash = window.location.hash.substring(1);
const jumpToSection = hash
  ? document.getElementById(window.location.hash.substring(1))
  : null;

let mm = gsap.matchMedia(),
  breakPoint = 1024;

mm.add(
  {
    isDesktop: `(min-width: ${breakPoint}px)`,
    isMobile: `(max-width: ${breakPoint - 1}px)`,
    reduceMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    let { isDesktop, isMobile, reduceMotion } = context.conditions;
    let intentObserver,
      hasExited = false;

    const heroEl = gsap.utils.selector(".hero-intro");
    const heroText = gsap.utils.toArray(".hero-intro h1 div");
    const logo = gsap.utils.selector(".intro__logo");
    const mobileLogo = gsap.utils.selector(".intro__logo--mobile");
    const Sections = Array.from(document.querySelectorAll(".fixed-page > *"));
    const heroTextOne = new SplitText(heroText[0], { type: "words" });
    const heroTextTwo = new SplitText(heroText[1], { type: "words" });

    const introAnimation = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("intro-seen", true);

        if (intentObserver) {
          intentObserver.enable();
        }

        document.querySelector(".nav").classList.add("animation-complete");
      },
    });

    if (!sessionStorage.getItem("intro-seen")) {
      introAnimation.set(heroEl("h1"), {
        autoAlpha: 1,
      });

      /* INTRO ANIMATION */
      introAnimation.from(heroTextOne.words, {
        rotateY: "10deg",
        x: 20,
        stagger: 0.04,
        autoAlpha: 0,
        duration: 1,
      });

      introAnimation.to(
        heroEl("h1 .page-one"),
        {
          y: 0,
          autoAlpha: 0.5,
          scale: 0.9,
          duration: 2,
        },
        "+=.5"
      );

      introAnimation.from(
        heroTextTwo.words,
        {
          rotateY: "10deg",
          x: 20,
          stagger: 0.04,
          autoAlpha: 0,
          duration: 2,
        },
        "<10%"
      );

      introAnimation.to(
        ".hero-intro__blob",
        {
          delay: 0.5,
          clipPath: "circle(4% at 50% 100%)",
          ease: "elastic.out(1, 0.75)",
          duration: 1,
        },
        "+=1"
      );

      introAnimation.to(heroEl("h1"), {
        scale: ".95",
        duration: 1,
        autoAlpha: 0,
      });

      introAnimation.to(
        ".hero-intro__blob",
        {
          clipPath: "circle(100% at 50% 75%)",
          duration: 2,
        },
        "<"
      );

      introAnimation.set("#intro", {
        background: "#111111",
      });

      introAnimation.set(
        [".hero-intro__blob", heroEl(".hero-intro--page-one")],
        {
          autoAlpha: 0,
        }
      );

      introAnimation.set(heroEl(".hero-intro--page-two"), {
        autoAlpha: 1,
      });

      introAnimation.from(
        isMobile ? mobileLogo(".bottom-letter") : logo(".bottom-letter"),
        {
          autoAlpha: 0,
          x: -5,
          y: -5,
          ease: "elastic.out(2, 0.75)",
          duration: 1,
        }
      );

      introAnimation.from(
        isMobile ? mobileLogo(".top-letter") : logo(".top-letter"),
        {
          autoAlpha: 0,
          x: 5,
          y: 5,
          ease: "elastic.out(2, 0.75)",
          duration: 1,
        },
        "<"
      );

      introAnimation.fromTo(
        isMobile ? mobileLogo(".ventures path") : logo(".ventures path"),
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: 0.05,
          duration: 1,
        }
      );

      introAnimation.fromTo(
        isMobile ? mobileLogo(".draw-me") : logo(".draw-me"),
        { drawSVG: "0%", ease: "none" },
        { drawSVG: "-100%", duration: 2 },
        "<"
      );

      introAnimation.from(heroEl(".scroll-down"), {
        autoAlpha: 0,
        duration: 2,
      });

      introAnimation.set(
        ".nav",
        {
          autoAlpha: 1,
        },
        "<"
      );

      introAnimation.from(
        ".nav li a",
        {
          x: -100,
          autoAlpha: 0,
          attr: {
            class: "nav__button active",
          },
          stagger: 0.05,
        },
        "<"
      );

      if (!localStorage["cookie_dismissed"]) {
        introAnimation.to(
          cookieNotice,
          {
            autoAlpha: 1,
          },
          "<"
        );
      }
    } else {
      introAnimation.to("#intro", {
        background: "#111111",
      });

      introAnimation.set(
        heroEl(".hero-intro--page-two"),
        {
          autoAlpha: 1,
        },
        "<"
      );

      introAnimation.from(heroEl(".bottom-letter"), {
        x: isMobile ? -3 : -5,
        y: isMobile ? -3 : -5,
        ease: "elastic.out(2, 0.75)",
      });

      introAnimation.from(
        heroEl(".top-letter"),
        {
          x: isMobile ? 3 : 5,
          y: isMobile ? 3 : 5,
          ease: "elastic.out(2, 0.75)",
        },
        "<"
      );

      introAnimation.fromTo(
        heroEl(".ventures path"),
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          stagger: 0.05,
        }
      );

      introAnimation.fromTo(
        isMobile ? mobileLogo(".draw-me") : logo(".draw-me"),
        { drawSVG: "0%", ease: "none", autoAlpha: 1 },
        { drawSVG: "-100%", duration: 2 },
        "<"
      );

      introAnimation.from(heroEl(".scroll-down"), {
        autoAlpha: 0,
      });

      if (!jumpToSection) {
        introAnimation.set(
          ".nav",
          {
            autoAlpha: 1,
          },
          "<"
        );

        introAnimation.from(
          ".nav li a",
          {
            x: -100,
            autoAlpha: 0,
            attr: {
              class: "nav__button active",
            },
            stagger: 0.05,
          },
          "<"
        );
      } else {
        introAnimation.to(".nav", {
          autoAlpha: 1,
        });
      }

      if (!localStorage["cookie_dismissed"]) {
        introAnimation.to(
          cookieNotice,
          {
            autoAlpha: 1,
          },
          "<"
        );
      }
    }

    if (isDesktop) {
      let currentIndex = -1;
      let animating;

      const pageAnimations = [false];

      gsap.set(Sections, {
        zIndex: (i) => i,
        autoAlpha: (i) => (!i ? 1 : 0),
        attr: {
          "data-index": (i) => i + 1,
        },
      });

      intentObserver = ScrollTrigger.observe({
        type: "scroll,wheel,touch",
        onUp: () => !animating && gotoPanel(currentIndex - 1, false),
        onDown: () => !animating && gotoPanel(currentIndex + 1, true),
        onLeft: () =>
          !animating &&
          currentIndex > 0 &&
          currentIndex < 5 &&
          gotoPanel(currentIndex - 1, false),
        onRight: () =>
          !animating &&
          currentIndex > 0 &&
          currentIndex < 5 &&
          gotoPanel(currentIndex + 1, true),
        tolerance: 250,
        wheelSpeed: 0.5,
        scrollSpeed: 0.5,
        preventDefault: true,
      });

      intentObserver.disable();

      ScrollTrigger.create({
        trigger: ".fixed-page",
        pin: true,
        start: "top top",
        end: "+=1",
        onEnterBack: () => {
          intentObserver.enable();
          gotoPanel(currentIndex - 1, false);
        },
      });

      let hasInteractedWithPortfolio = false;
      let portfolioDirection = 0;

      const navLinks = gsap.utils.toArray(`.nav__list a[href^="#"]`);
      const porfolioLinks = gsap.utils.toArray("[portfolio-link]");

      function gotoPanel(index, isScrollingDown, isQuickNav) {
        if (index <= -1 || index === currentIndex) {
          return;
        }

        // portfolio functionality
        if (
          currentIndex === 5 &&
          ((portfolioDirection === 1 && !isScrollingDown) ||
            (portfolioDirection === -1 && isScrollingDown))
        ) {
          intentObserver.disable();
          return;
        }

        if (porfolioLinks.length > 15) {
          // enable scrolling on Portfolio section
          if (index === 5) {
            intentObserver.disable();
          } else {
            intentObserver.enable();
          }
        }

        document.querySelector("body").style.overflow = "hidden";

        // prevent immediate scroll from button
        if (hasExited) {
          setTimeout(() => {
            hasExited = false;
          }, 500);
          return;
        }

        animating = true;

        const isSlider =
          index > 0 &&
          index < document.querySelectorAll(".facts__section").length + 1;

        let shouldSlide = "";

        if (
          isScrollingDown &&
          Sections[currentIndex]?.className?.match("facts__section")
        ) {
          shouldSlide = "exit";
        } else if (
          !isScrollingDown &&
          Sections[index]?.className?.match("facts__section")
        ) {
          shouldSlide = "enter";
        } else if (
          Sections[index]?.className?.match("facts__section") &&
          isQuickNav
        ) {
          shouldSlide = "enter";
        }

        if (pageAnimations[index]) {
          pageAnimations[index].seek(0);
          pageAnimations[index].pause();
        }

        // Highlight correct nav
        navLinks.forEach((link) => {
          const indexes = link.getAttribute("data-indexes").split(",");
          link.classList.remove("active");
          link.classList.remove("previous");

          for (let linkIndex = 0; linkIndex < indexes.length; linkIndex++) {
            const i = Number(indexes[linkIndex]);

            if (i <= index) {
              link.classList.add("previous");
              if (i === index) {
                link.classList.remove("previous");
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            }
          }
        });

        // return to normal scroll if we're at the end or back up to the start
        if (index === Sections.length && isScrollingDown) {
          let target = index;
          document.querySelector("body").style.overflow = "";
          gsap.to(target, {
            // xPercent: isScrollingDown ? -100 : 0,
            duration: 0.0,
            onComplete: () => {
              animating = false;
              hasExited = true;
              isScrollingDown && intentObserver.disable();
            },
          });
          return;
        }

        let target = isScrollingDown ? Sections[index] : Sections[currentIndex];

        header.classList.toggle("hide", isScrollingDown && !isQuickNav);

        const transition = gsap.timeline({
          duration: 0.75,
          ease: "power1.in",
          onComplete: () => {
            if (!pageAnimations[index]) {
              animating = false;
            }
          },
          onStart: () => {
            document
              .querySelector(".active-slide")
              ?.classList.remove("active-slide");

            // on page load, sometimes target is unavailable
            if (target) {
              target.classList.add("active-slide");
            }

            gsap.to("body", {
              color:
                Sections[index].getAttribute("data-bg") === "#ffffff"
                  ? "#3E3E3E"
                  : "#ffffff",
            });

            gsap.to("header", {
              color:
                Sections[index].getAttribute("data-bg") === "#ffffff"
                  ? "#000000"
                  : "#ffffff",
            });

            if (pageAnimations[index]) {
              setTimeout(() => {
                pageAnimations[index].eventCallback("onComplete", () => {
                  animating = false;
                });
                pageAnimations[index].play();
              }, 250);
            }
          },
        });

        if (!isSlider) {
          // Makes sure the line fades out before transition
          transition.to(
            ".facts-section-line",
            {
              autoAlpha: 0,
            },
            "<"
          );
        }

        // make sure all previous slides are visible when using quicknav
        // quicknav pretty much takes over animating just the before and after slides
        if (isQuickNav) {
          if (shouldSlide && !isScrollingDown) {
            transition.set(
              Sections[index].querySelector(".facts__section-content"),
              {
                xPercent: 0,
                autoAlpha: 1,
              }
            );
          }

          for (let i = 0; i < Sections.length - 1; i++) {
            if (i === currentIndex || i === index) {
              if (!isScrollingDown) {
                transition.set(Sections[index], {
                  autoAlpha: 1,
                });
                transition.to(Sections[currentIndex], {
                  autoAlpha: 0,
                });
              } else {
                transition.to(Sections[index], {
                  autoAlpha: 1,
                });
                if (Sections[currentIndex]) {
                  // This may not exist if there is a # in url
                  transition.set(Sections[currentIndex], {
                    autoAlpha: 0,
                  });
                }
              }
            } else {
              transition.set(Sections[i], {
                autoAlpha: 0,
              });
            }
          }
        } else {
          // else navigating normally

          // horizontal scroll section
          if (shouldSlide) {
            if (!isScrollingDown) {
              transition.to(
                Sections[currentIndex],
                {
                  autoAlpha: 0,
                },
                "<"
              );

              if (isSlider) {
                if (
                  Sections[currentIndex].querySelector(
                    ".facts__section-content"
                  )
                ) {
                  transition.to(
                    Sections[currentIndex].querySelector(
                      ".facts__section-content"
                    ),
                    {
                      xPercent: 20,
                      autoAlpha: 0,
                    },
                    "<"
                  );
                }

                transition.fromTo(
                  Sections[index].querySelector(".facts__section-content"),
                  {
                    xPercent: -20,
                    autoAlpha: 0,
                  },
                  {
                    xPercent: 0,
                    autoAlpha: 1,
                  },
                  "<50%"
                );
              }

              transition.to(
                Sections[index],
                {
                  autoAlpha: 1,
                },
                "<"
              );
            } else {
              transition.to(
                Sections[currentIndex],
                {
                  autoAlpha: 0,
                },
                "<"
              );

              if (isSlider) {
                transition.to(
                  Sections[currentIndex].querySelector(
                    ".facts__section-content"
                  ),
                  {
                    xPercent: -20,
                    autoAlpha: 0,
                  },
                  "<"
                );
                if (Sections[index].querySelector(".facts__section-content")) {
                  transition.fromTo(
                    Sections[index].querySelector(".facts__section-content"),
                    {
                      xPercent: 20,
                      autoAlpha: 0,
                    },
                    {
                      xPercent: 0,
                      autoAlpha: 1,
                    },
                    "<50%"
                  );
                }
              }

              transition.to(
                Sections[index],
                {
                  autoAlpha: 1,
                },
                "<"
              );
            }
          } else {
            // Normal scroll
            if (!isScrollingDown) {
              Sections.forEach((section, i) => {
                if (i < currentIndex) {
                  transition.set(section, {
                    autoAlpha: 1,
                  });
                }
              });
            }
            transition.to(
              target,
              {
                autoAlpha: isScrollingDown ? 1 : 0,
              },
              isScrollingDown ? "<50%" : ""
            );
          }
        }

        // horizontal scroll line
        if (isSlider) {
          transition.to(
            ".facts-section-line",
            {
              autoAlpha: 1,
            },
            "<"
          );
          gsap.fromTo(
            ".facts-section-line path",
            {
              drawSVG:
                (100 / document.querySelectorAll(".facts__section").length) *
                  currentIndex +
                "%",
              duration: 2,
            },
            {
              drawSVG:
                (100 / document.querySelectorAll(".facts__section").length) *
                  index +
                "%",
              duration: 2,
            },
            "<"
          );
        } else {
          gsap.fromTo(
            ".facts-section-line path",
            {
              drawSVG:
                (100 / document.querySelectorAll(".facts__section").length) *
                  currentIndex +
                "%",
            },
            {
              drawSVG: index === 0 ? "0 0" : "-100% 100%",
            },
            "<"
          );
        }

        currentIndex = Number(index);

        if (currentIndex > 0) {
          // horizontal scroll needs a backgorund as each slide is offset sideways and does not have
          // the previous slide 'behind' it
          document.getElementById("intro").classList.add("add-background");
          header.classList.add("show-logo");
        } else {
          document.getElementById("intro").classList.remove("add-background");
          header.classList.remove("show-logo");
        }
      }

      let hasScrolled = false;

      window.addEventListener("keyup", (e) => {
        const goDown = ["ArrowRight", "ArrowDown"];
        const goUp = ["ArrowLeft", "ArrowUp"];

        if (goDown.indexOf(e.key) > -1) {
          gotoPanel(currentIndex + 1, true);
        } else if (goUp.indexOf(e.key) > -1) {
          gotoPanel(currentIndex - 1, false);
        }
      });

      if (jumpToSection) {
        // if # in the url, jump to that index (if exists)
        gotoPanel(
          Number(jumpToSection.getAttribute("data-index")) - 1,
          true,
          true
        );
      } else {
        gotoPanel(0, true, true);
      }
      gsap.utils.toArray('[href^="#"]').forEach((link) => {
        const targetIndex =
          Number(
            document
              .getElementById(link.href.split("#")[1])
              ?.getAttribute("data-index")
          ) - 1;

        link.addEventListener("click", (e) => {
          e.preventDefault();

          header.classList.remove("show-mobile-menu");

          if (targetIndex) {
            window.location = "#" + link.href.split("#")[1];
            gotoPanel(targetIndex, targetIndex > currentIndex, true);
          }
        });
      });

      if (Sections) {
        // # THESIS
        const immigrantsSection = gsap.utils.selector("[thesis-content]");
        const immigrantSectionTimeline = gsap.timeline({
          defaults: {
            duration: 1,
          },
        });

        const immigrantsSectionHeading = new SplitText(immigrantsSection("*"), {
          type: "words",
        });

        immigrantSectionTimeline.from(immigrantsSectionHeading.words, {
          autoAlpha: 0,
          y: 10,
          stagger: 0.05,
          duration: 1,
        });

        pageAnimations.push(immigrantSectionTimeline);

        // /* PORTFOLIO SECTION */
        ScrollTrigger.create({
          scroller: "[portfolio-content]",
          scrub: true,
          onUpdate: (self) => {
            portfolioDirection = self.direction;

            if (self.progress > 0.95 && hasInteractedWithPortfolio) {
              hasInteractedWithPortfolio = false;
              setTimeout(() => {
                intentObserver.enable();
              }, 1000);
            } else if (self.progress < 0.05 && hasInteractedWithPortfolio) {
              hasInteractedWithPortfolio = false;
              setTimeout(() => {
                intentObserver.enable();
              }, 1000);
            }
          },
          onToggle: (self) => {
            if (self.progress > 0 && !hasInteractedWithPortfolio) {
              hasInteractedWithPortfolio = true;
            }
          },
        });

        const portfolio = gsap.timeline({
          paused: true,
          onStart: () => {
            document.querySelector("[portfolio-content]").scroll(0, 0);

            hasInteractedWithPortfolio = false;

            gsap.to(".line-portfolio-about path", {
              drawSVG: "100%",
              duration: 2,
              autoAlpha: 1,
            });
          },
        });

        portfolio.from("[portfolio-content]", {
          y: 20,
          autoAlpha: 0,
        });

        portfolio.set(
          ".line-portfolio-about path",
          {
            autoAlpha: 0,
            drawSVG: 0,
          },
          "<"
        );

        portfolio.from(
          "[portfolio-link-wrapper]",
          {
            y: 30,
            autoAlpha: 0,
            stagger: 0.05,
          },
          "<"
        );

        pageAnimations.push(portfolio);

        // /* ABOUT SECTION */
        const founderTimeline = gsap.timeline({});

        founderTimeline.from(".founder > div", {
          autoAlpha: 0,
          y: 20,
          stagger: 0.05,
        });

        founderTimeline.from(".about-line--top path", {
          drawSVG: "0 0",
        });

        founderTimeline.from(".about__line-about path", {
          drawSVG: 0,
        });

        pageAnimations.push(founderTimeline);

        // /* ABOUT - COMMUNITY */
        const communitySection = document.querySelector(".community");
        if (communitySection) {
          const communityTimeline = gsap.timeline({
            paused: true,
            defaults: {
              duration: 1,
            },
          });

          communityTimeline.from(
            communitySection,
            {
              y: 20,
              autoAlpha: 0,
            },
            "<"
          );

          communityTimeline.from(
            communitySection.querySelectorAll(".about-content__content > div"),
            {
              y: 10,
              autoAlpha: 0,
              stagger: 0.075,
            },
            "<"
          );

          communityTimeline.from(
            communitySection.querySelector(".about__line-community-faq path"),
            {
              drawSVG: "100% 100%",
            },
            "<"
          );

          pageAnimations.push(communityTimeline);
        }

        // FAQ 1
        const faqTimeline = gsap.timeline({ paused: true });
        const faqSection = gsap.utils.selector("#faq-1");

        faqTimeline.from(faqSection(".faq-line path"), {
          drawSVG: 0,
          duration: 1,
        });

        faqTimeline.from(
          faqSection("h2"),
          {
            autoAlpha: 0,
          },
          "<"
        );

        faqTimeline.from(
          faqSection(".faq__faq-item"),
          {
            autoAlpha: 0,
            stagger: 0.05,
            scaleY: 0,
          },
          "<"
        );

        pageAnimations.push(faqTimeline);
      } else if (isMobile) {
        gsap.from(".line-portfolio-about path", {
          drawSVG: 0,
          scrollTrigger: {
            trigger: ".line-portfolio-about",
            start: "top bottom",
            bottom: "bottom center",
            scrub: true,
            ease: "none",
          },
        });

        gsap.from(".about__line-about path", {
          drawSVG: 0,
          scrollTrigger: {
            trigger: ".founder__pinned-wrapper",
            start: "center center",
            end: "bottom center",
            scrub: true,
            ease: "none",
          },
        });
      }
    } else if (isMobile) {
      if (jumpToSection) {
        window.scrollTo({ top: jumpToSection.offsetTop, behavior: "smooth" });
      }

      window.addEventListener("DOMContentLoaded", () => {
        const height = window.innerHeight;
        document.querySelector(".hero-intro").style.height = `${height}px`;
      });

      /* SECTION ONE */
      const immigrantsSection = gsap.utils.selector("[thesis-content]");
      const immigrantSectionTitle = new SplitText(immigrantsSection("*"), {
        type: "words",
      });

      gsap.from(immigrantSectionTitle.words, {
        autoAlpha: 0,
        y: 20,
        stagger: 0.05,
        duration: 1,
        scrollTrigger: {
          trigger: "[thesis-content]",
          start: "top bottom",
          end: "+=500",
        },
      });

      /* PORTFOLIO SECTION (MOBILE) */
      const portfolioSection = gsap.utils.selector("#portfolio");
      gsap.from(portfolioSection("[portfolio-link-wrapper]"), {
        y: 200,
        autoAlpha: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: "[portfolio-list]",
          start: "top bottom",
          end: "bottom bottom",
          scrub: false,
          once: true,
        },
      });

      /* OUR APPROACH (COMMUNITY, MOBILE) */
      const communitySection = document.querySelector(".community");
      if (communitySection) {
        const communityTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".community",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            once: true,
          },
        });

        communityTimeline.from(
          communitySection.querySelector(".about__community-title"),
          {
            autoAlpha: 0,
          }
        );

        gsap.utils
          .toArray(
            communitySection.querySelectorAll(".about-content__content > div")
          )
          .forEach((section) => {
            gsap.from(section, {
              autoAlpha: 0,
              y: 100,
              scrollTrigger: {
                trigger: section,
                end: "+=500",
                scrub: 1,
                once: true,
              },
            });
          });
      }

      const faqSection = gsap.utils.selector("#faq-1");
      const faqTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#faq-1",
          start: "top bottom",
          end: "bottom bottom",
          scrub: false,
          once: true,
        },
      });

      faqTimeline.from(faqSection("h2"), {
        autoAlpha: 0,
      });

      faqTimeline.from(faqSection(".faq__faq-item"), {
        scaleY: 0,
        autoAlpha: 0,
        stagger: 0.05,
      });

      gsap.from(".line-portfolio-about--mobile path", {
        scrollTrigger: {
          start: "top bottom-=400",
          trigger: ".line-portfolio-about--mobile",
        },
        drawSVG: 0,
      });

      gsap.from(".about__line-about path", {
        scrollTrigger: {
          start: "top bottom-=400",
          trigger: ".about__line-about",
        },
        drawSVG: 0,
      });

      const menuLinks = gsap.utils.toArray('.header__mobile-menu [href*="#"]');
      menuLinks?.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const index = document.getElementById(link.hash.substring(1));
          header.classList.remove("show-mobile-menu");
          document.documentElement.style.overflow = "";
          window.scrollTo({ top: index.offsetTop, behavior: "smooth" });
        });
      });

      ScrollTrigger.create({
        start: "top top",
        end: "bottom bottom",
        onUpdate: (e) => {
          const windowPos = window.pageYOffset || document.scrollTop || 0;

          Sections.forEach((section) => {
            const sectionHeight = section.offsetHeight;
            if (
              section.offsetTop + sectionHeight >= windowPos &&
              section.offsetTop <= windowPos
            ) {
              const currentBg = section.getAttribute("data-bg");
              header.style.color =
                currentBg === "#111111" ? "#ffffff" : "#111111";
            }
          });
        },
      });
    }
  }
);
