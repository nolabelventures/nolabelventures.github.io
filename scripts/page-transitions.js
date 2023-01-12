const internalLinks = Array.from(
  document.querySelectorAll(
    '[href]:not([href^="#"]):not([href^="mailto"]):not([href^="http"])'
  )
);

if (internalLinks.length) {
  internalLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      window.pageFunctions = [];
      e.preventDefault();
      const linkPath = e.currentTarget.pathname || "/";

      const newPage = await fetch(e.currentTarget.href || "/");
      const html = await newPage.text();
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");

      document.querySelector("body script").innerHTML = "";

      document.querySelector("body").innerHTML =
        '<div class="page-transition">' +
        document.querySelector("body").innerHTML +
        "</div>" +
        doc.querySelector("body").innerHTML;

      function transitionPage(cb) {
        const transitionAnimation = gsap.timeline({
          onComplete: () => {
            const pageTransition = document.querySelector(".page-transition");
            const url = new URL(window.location.origin + linkPath);
            // window.history.pushState({}, '', url);
            window.location = url;
            pageTransition.parentNode.removeChild(pageTransition);

            let el = document.body;
            pgia.elementAnimationsManager.refreshAnimations(el, true);
            pgia.scrollSceneManager.updateScene(el, true);

            // fire page javascript
            window.pageFunctions.forEach((fn) => fn());

            if (cb) {
              cb();
            }
          },
        });

        transitionAnimation.to(".page-transition", {
          autoAlpha: 0,
        });

        if (linkPath === "/") {
          window.scrollTo(0,0)
          transitionAnimation.to(
            ".header__link-logo",
            {
              autoAlpha: 0,
            },
            "<"
          );

          transitionAnimation.to(
            "body",
            {
              background: "#111111",
              color: "white",
            },
            "<"
          );

          transitionAnimation.to(
            [".nav__list", ".nav__button"],
            {
              color: "white",
            },
            "<"
          );

          transitionAnimation.to(".nav", {
            x: 0,
          });
        } else {
          transitionAnimation.to(".nav", {
            x: "-100%",
          });

          transitionAnimation.set(".header", {
            justifyContent: "space-between",
          });
          transitionAnimation.to(
            ".header__link-logo",
            {
              autoAlpha: 1,
              display: "block",
            },
            "<"
          );
          transitionAnimation.to(
            [".hero-intro--page-two", "#intro"],
            {
              background: "transparent",
            },
            "<"
          );
          transitionAnimation.to(
            "body",
            {
              background: "white",
              color: "black",
            },
            "<"
          );
          transitionAnimation.to(
            [
              ".hero-intro .top-letter path",
              ".hero-intro .bottom-letter path",
              ".hero-intro .ventures path",
            ],
            {
              fill: "black",
            },
            "<"
          );

          transitionAnimation.to(
            [".nav__list", ".nav__button"],
            {
              color: "#ccc",
            },
            "<"
          );
        }
      }

      if ((window.pageYOffset || document.scrollTop) > window.innerHeight) {
        transitionPage()
          // gsap.to(window, {
          //   duration: 0.5,
          //   scrollTo: 0,
            // onComplete: transitionPage
          // });
      } else {
        transitionPage();
      }
    });
  });
}
