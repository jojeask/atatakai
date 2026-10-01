/*
  Atatakai — rörelselager, steg 1 av docs/motion-guide.md:
  kondenserad header vid scroll och aktivt penseldrag i menyn.

  Allt här är progressiv förbättring. Laddas inte filen ser sidan
  likadan ut, bara utan rörelse. Rör inte js/app.js.
*/
(function () {
  "use strict";

  /* Tröskelvärden ur docs/motion-guide.md: kondensera vid 64 px,
     expandera först vid 52 px. Gapet på 12 px hindrar att klassen
     flimrar när någon står och vaggar precis vid gränsen. */
  var CONDENSE_AT = 64;
  var EXPAND_AT = 52;

  /* En enda bildrute-puls delas av allt som lyssnar på scroll.
     Läsningen sker i en rAF, så scrollen blockeras aldrig. */
  var onFrame = [];
  var ticking = false;

  function tick() {
    ticking = false;
    for (var i = 0; i < onFrame.length; i++) {
      onFrame[i]();
    }
  }

  function requestTick() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(tick);
  }

  function setupHeaderCondense() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var isCondensed = false;

    // Klassen byts bara när tröskeln passeras, inte varje bildruta.
    onFrame.push(function () {
      var y = window.scrollY;
      if (!isCondensed && y >= CONDENSE_AT) {
        isCondensed = true;
        header.classList.add("is-condensed");
      } else if (isCondensed && y <= EXPAND_AT) {
        isCondensed = false;
        header.classList.remove("is-condensed");
      }
    });
  }

  function setupNavHighlight() {
    var pairs = [];
    var links = document.querySelectorAll(".primary-nav a.u-stroke[href^='#']");

    Array.prototype.forEach.call(links, function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) pairs.push({ link: link, section: section });
    });
    if (!pairs.length) return;

    var current = null;

    /* Avsnittet som täcker fönstrets mitt är det läsaren tittar på.
       Mätt direkt i stället för med IntersectionObserver: en root
       utan höjd (rootMargin -50%/-50%) rapporteras inte som träff
       i alla webbläsare. Fyra rect-läsningar per bildruta är billigt. */
    onFrame.push(function () {
      var middle = window.innerHeight / 2;
      var found = null;

      for (var i = 0; i < pairs.length; i++) {
        var box = pairs[i].section.getBoundingClientRect();
        if (box.top <= middle && box.bottom > middle) {
          found = pairs[i];
          break;
        }
      }

      if (found === current) return;
      current = found;
      pairs.forEach(function (pair) {
        pair.link.classList.toggle("is-active", pair === found);
      });
    });
  }

  setupHeaderCondense();
  setupNavHighlight();

  if (onFrame.length) {
    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick, { passive: true });
    tick(); // rätt läge direkt om sidan laddas om mitt i dokumentet
  }
})();
