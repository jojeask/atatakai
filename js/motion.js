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

  function setupHeaderCondense() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var isCondensed = false;
    var ticking = false;

    function update() {
      ticking = false;
      var y = window.scrollY;
      if (!isCondensed && y >= CONDENSE_AT) {
        isCondensed = true;
        header.classList.add("is-condensed");
      } else if (isCondensed && y <= EXPAND_AT) {
        isCondensed = false;
        header.classList.remove("is-condensed");
      }
    }

    /* Lyssnaren är passiv och all läsning sker i en rAF, så scrollen
       aldrig blockeras. Klassen byts bara när tröskeln passeras. */
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // rätt läge direkt om sidan laddas om mitt i dokumentet
  }

  function setupNavHighlight() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll(".primary-nav a.u-stroke[href^='#']")
    );
    if (!links.length || !("IntersectionObserver" in window)) return;

    var sections = [];
    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) sections.push({ link: link, section: section });
    });
    if (!sections.length) return;

    var visible = [];

    function render() {
      sections.forEach(function (pair) {
        pair.link.classList.toggle("is-active", pair.section === visible[0]);
      });
    }

    /* Marginalen gör mitten av fönstret till mätpunkt: det avsnitt
       läsaren faktiskt tittar på är det som får draget kvar. */
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var index = visible.indexOf(entry.target);
          if (entry.isIntersecting && index === -1) {
            visible.push(entry.target);
          } else if (!entry.isIntersecting && index !== -1) {
            visible.splice(index, 1);
          }
        });
        // Dokumentordning vinner när två avsnitt möts vid mätpunkten.
        visible.sort(function (a, b) {
          return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
        });
        render();
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (pair) {
      observer.observe(pair.section);
    });
  }

  setupHeaderCondense();
  setupNavHighlight();
})();
