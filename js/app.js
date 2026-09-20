// Bokningsformuläret behöver en mottagare. Klistra in adressen från Formspree,
// Web3Forms eller liknande här — så skickas förfrågan dit på riktigt.
// Lämnas den tom körs formuläret i demoläge och sparar bara lokalt i webbläsaren.
const BOOKING_ENDPOINT = "";

const hours = [
  { day: 1, sv: "Måndag", en: "Monday", open: null },
  { day: 2, sv: "Tisdag", en: "Tuesday", open: "11:00", close: "20:00" },
  { day: 3, sv: "Onsdag", en: "Wednesday", open: "11:00", close: "20:00" },
  { day: 4, sv: "Torsdag", en: "Thursday", open: "11:00", close: "20:00" },
  { day: 5, sv: "Fredag", en: "Friday", open: "11:00", close: "20:00" },
  { day: 6, sv: "Lördag", en: "Saturday", open: "15:00", close: "20:00" },
  { day: 0, sv: "Söndag", en: "Sunday", open: "15:00", close: "20:00" },
];

const copy = {
  sv: {
    skip: "Hoppa till innehåll",
    "brand.sub": "Hörby",
    "nav.menu": "Meny",
    "nav.about": "Om oss",
    "nav.reviews": "Omdömen",
    "nav.visit": "Besök",
    "nav.book": "Boka bord",
    "nav.toggle": "Öppna meny",
    "hero.eyebrow": "Japanskt & koreanskt kök i Hörby",
    "hero.title": "Varm, nylagad mat — som hemma.",
    "hero.lede":
      "Autentisk japansk och koreansk mat, tillagad på plats i vårt öppna kök. Perfekt för lunch, middag eller take away.",
    "hero.cta1": "Boka bord",
    "hero.cta2": "Se menyn",
    "hero.meta1.label": "Öppet idag",
    "hero.meta2.label": "Adress",
    "hero.meta3.label": "Bokning & take away",
    "about.eyebrow": "Välkomna till Atatakai",
    "about.title": "Atatakai betyder varm.",
    "about.p1":
      "Atatakai betyder varm, nylagad mat som hemma. Vi erbjuder autentisk japansk och koreansk mat, tillagad på plats i vårt öppna kök där du kan se maten lagas framför dig.",
    "about.p2":
      "Hos oss möts du av en varm atmosfär, fräscha råvaror och smaker som känns hemlagade. Perfekt för lunch, middag eller take away.",
    "about.f1": "Misosoppa ingår till maten",
    "about.f2": "Vegetariska alternativ, även sushi",
    "about.f3": "Plats för sällskap på runt 30 personer",
    "about.f4": "Tillgänglighetsanpassat, med toalett för rullstolsanvändare",
    "about.caption": "Öppet kök — se maten lagas framför dig.",
    "menu.tab.sushi": "Sushi",
    "menu.tab.ramen": "Ramen",
    "menu.tab.korea": "Koreanskt",
    "menu.eyebrow": "Meny",
    "menu.title": "Japanska och koreanska favoriter.",
    "menu.lede":
      "En stor meny med något för alla. Här är några av gästernas favoriter — misosoppa ingår. Berätta gärna om allergier när du beställer.",
    "menu.s1.desc": "Nylagad sushi med fräscha råvaror, gjord på plats.",
    "menu.s2.title": "Vegetarisk sushi",
    "menu.s2.desc": "Välgjord och generös — för dig som inte äter fisk.",
    "menu.r1.desc": "En varm skål med buljong och nudlar, lagad i vårt öppna kök.",
    "menu.k1.desc": "Krispig friterad kyckling på koreanskt vis.",
    "menu.k2.desc": "Grillat, marinerat kött — gott på plats eller som take away.",
    "reviews.eyebrow": "Omdömen",
    "reviews.title": "Vad våra gäster säger.",
    "reviews.more": "Läs fler omdömen på Google",
    "visit.eyebrow": "Hitta hit",
    "visit.title": "Storgatan 5 i Hörby.",
    "visit.p":
      "Välkommen in för lunch eller middag — eller ring och beställ take away på 073-905 08 79.",
    "visit.map": "Öppna i Google Maps",
    "map.title": "Visa karta",
    "map.note":
      "Kartan laddas från Google Maps. Genom att visa den godkänner du att Google kan sätta kakor.",
    "map.cta": "Ladda kartan",
    "map.frameTitle": "Karta till Atatakai i Hörby",
    "book.eyebrow": "Bokning",
    "book.title": "Sitt ner hos oss.",
    "book.p":
      "Boka bord för upp till åtta personer här. Firar ni något större? Lokalen rymmer runt 30 gäster — ring oss på 073-905 08 79 så ordnar vi det.",
    "book.note":
      "Du får en bekräftelse direkt. Formuläret sparar bokningen lokalt tills ett bokningssystem kopplas in.",
    "form.name": "Namn",
    "form.email": "E-post",
    "form.date": "Datum",
    "form.time": "Tid",
    "form.guests": "Gäster",
    "form.notes": "Allergier eller önskemål",
    "form.submit": "Skicka förfrågan",
    "footer.tag": "Japansk & koreansk restaurang i Hörby",
    closed: "Stängt",
    formOk: "Tack, {name}. Vi har tagit emot er förfrågan för {guests} gäster {date} kl {time}.",
    formErr: "Fyll i namn, e-post, datum och tid.",
    formSending: "Skickar …",
    formFailed:
      "Förfrågan kunde tyvärr inte skickas. Ring oss gärna på 073-905 08 79 så hjälper vi dig.",
    formClosed: "Vi har stängt på måndagar. Välj en annan dag.",
    formHours: "Den dagen har vi öppet {open}–{close}. Välj en tid senast en timme före stängning.",
  },
  en: {
    skip: "Skip to content",
    "brand.sub": "Hörby",
    "nav.menu": "Menu",
    "nav.about": "About",
    "nav.reviews": "Reviews",
    "nav.visit": "Visit",
    "nav.book": "Reserve",
    "nav.toggle": "Open menu",
    "hero.eyebrow": "Japanese & Korean kitchen in Hörby",
    "hero.title": "Warm, freshly made food — like at home.",
    "hero.lede":
      "Authentic Japanese and Korean food, cooked to order in our open kitchen. Perfect for lunch, dinner or takeaway.",
    "hero.cta1": "Book a table",
    "hero.cta2": "See the menu",
    "hero.meta1.label": "Open today",
    "hero.meta2.label": "Address",
    "hero.meta3.label": "Bookings & takeaway",
    "about.eyebrow": "Welcome to Atatakai",
    "about.title": "Atatakai means warm.",
    "about.p1":
      "Atatakai means warm, freshly made food, just like at home. We serve authentic Japanese and Korean food, cooked on site in our open kitchen where you can watch your meal being made.",
    "about.p2":
      "Expect a warm atmosphere, fresh ingredients and flavours that taste homemade. Perfect for lunch, dinner or takeaway.",
    "about.f1": "Miso soup included with your meal",
    "about.f2": "Vegetarian options, sushi included",
    "about.f3": "Room for groups of around 30",
    "about.f4": "Accessible, with a wheelchair-accessible toilet",
    "about.caption": "Open kitchen — watch your food being made.",
    "menu.tab.sushi": "Sushi",
    "menu.tab.ramen": "Ramen",
    "menu.tab.korea": "Korean",
    "menu.eyebrow": "Menu",
    "menu.title": "Japanese and Korean favourites.",
    "menu.lede":
      "A big menu with something for everyone. Here are a few guest favourites — miso soup is included. Let us know about allergies when you order.",
    "menu.s1.desc": "Freshly made sushi with fresh ingredients, prepared on site.",
    "menu.s2.title": "Vegetarian sushi",
    "menu.s2.desc": "Well made and generous — for those who don’t eat fish.",
    "menu.r1.desc": "A warm bowl of broth and noodles, cooked in our open kitchen.",
    "menu.k1.desc": "Crispy fried chicken, Korean style.",
    "menu.k2.desc": "Grilled, marinated meat — great to eat in or take away.",
    "reviews.eyebrow": "Reviews",
    "reviews.title": "What our guests say.",
    "reviews.more": "Read more reviews on Google",
    "visit.eyebrow": "Find us",
    "visit.title": "Storgatan 5, Hörby.",
    "visit.p":
      "Drop in for lunch or dinner — or call 073-905 08 79 to order takeaway.",
    "visit.map": "Open in Google Maps",
    "map.title": "Show map",
    "map.note":
      "The map loads from Google Maps. Showing it means Google may set cookies.",
    "map.cta": "Load the map",
    "map.frameTitle": "Map to Atatakai in Hörby",
    "book.eyebrow": "Reservations",
    "book.title": "Sit down with us.",
    "book.p":
      "Book a table for up to eight here. Celebrating something bigger? The room seats around 30 — call us on 073-905 08 79 and we will arrange it.",
    "book.note":
      "You get a confirmation immediately. The form stores the request locally until a booking system is connected.",
    "form.name": "Name",
    "form.email": "Email",
    "form.date": "Date",
    "form.time": "Time",
    "form.guests": "Guests",
    "form.notes": "Allergies or notes",
    "form.submit": "Send request",
    "footer.tag": "Japanese & Korean restaurant in Hörby",
    closed: "Closed",
    formOk: "Thank you, {name}. We received your request for {guests} guests on {date} at {time}.",
    formErr: "Please fill in name, email, date and time.",
    formSending: "Sending …",
    formFailed:
      "Sorry, the request could not be sent. Please call us on 073-905 08 79 and we will help you.",
    formClosed: "We are closed on Mondays. Please pick another day.",
    formHours: "That day we are open {open}–{close}. Please pick a time at least an hour before closing.",
  },
};

const state = {
  lang: localStorage.getItem("atatakai-lang") || "sv",
};

function applyLanguage() {
  const dict = copy[state.lang];
  document.documentElement.lang = state.lang === "sv" ? "sv" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (dict[key]) node.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    const key = node.getAttribute("data-i18n-aria");
    if (dict[key]) node.setAttribute("aria-label", dict[key]);
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === state.lang);
  });
  renderHours();
}

function hourLabel(item) {
  return item.open ? `${item.open}–${item.close}` : copy[state.lang].closed;
}

function renderHours() {
  const list = document.getElementById("hours-list");
  const today = new Date().getDay();
  const todayHours = hours.find((item) => item.day === today);
  document.getElementById("open-today").textContent = hourLabel(todayHours);
  list.innerHTML = hours
    .map((item) => {
      const label = state.lang === "sv" ? item.sv : item.en;
      const todayClass = item.day === today ? "is-today" : "";
      return `<li class="${todayClass}"><span>${label}</span><span>${hourLabel(item)}</span></li>`;
    })
    .join("");
}

function setupNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupMenuTabs() {
  const tabs = document.querySelectorAll(".menu-tabs button");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      document.querySelectorAll(".menu-panel").forEach((panel) => {
        const active = panel.id === `panel-${tab.dataset.tab}`;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });
}

function setupMap() {
  const frame = document.getElementById("map-frame");
  const button = document.getElementById("map-consent");
  if (!frame || !button) return;
  button.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.title = copy[state.lang]["map.frameTitle"];
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.src =
      "https://maps.google.com/maps?q=Storgatan%205%2C%20242%2031%20H%C3%B6rby&t=&z=15&ie=UTF8&iwloc=&output=embed";
    frame.replaceChildren(iframe);
  });
}

function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// Returns an error message if the chosen date/time falls outside opening hours.
function checkOpeningHours(date, time) {
  const dict = copy[state.lang];
  const day = hours.find((item) => item.day === new Date(`${date}T00:00`).getDay());
  if (!day.open) return dict.formClosed;
  const t = toMinutes(time);
  if (t < toMinutes(day.open) || t > toMinutes(day.close) - 60) {
    return dict.formHours.replace("{open}", day.open).replace("{close}", day.close);
  }
  return null;
}

function setupForm() {
  const form = document.getElementById("booking-form");
  const status = document.getElementById("form-status");
  const dateInput = form.elements.date;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.min = tomorrow.toISOString().slice(0, 10);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.email || !data.date || !data.time) {
      status.textContent = copy[state.lang].formErr;
      status.classList.remove("is-ok");
      return;
    }
    const hoursError = checkOpeningHours(data.date, data.time);
    if (hoursError) {
      status.textContent = hoursError;
      status.classList.remove("is-ok");
      return;
    }
    const showConfirmation = () => {
      status.textContent = copy[state.lang].formOk
        .replace("{name}", data.name)
        .replace("{guests}", data.guests)
        .replace("{date}", data.date)
        .replace("{time}", data.time);
      status.classList.add("is-ok");
      form.reset();
      dateInput.min = tomorrow.toISOString().slice(0, 10);
    };

    if (!BOOKING_ENDPOINT) {
      const bookings = JSON.parse(localStorage.getItem("atatakai-bookings") || "[]");
      bookings.push({ ...data, createdAt: new Date().toISOString() });
      localStorage.setItem("atatakai-bookings", JSON.stringify(bookings));
      showConfirmation();
      return;
    }

    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    status.classList.remove("is-ok");
    status.textContent = copy[state.lang].formSending;
    fetch(BOOKING_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        showConfirmation();
      })
      .catch(() => {
        status.textContent = copy[state.lang].formFailed;
        status.classList.remove("is-ok");
      })
      .finally(() => {
        button.disabled = false;
      });
  });
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.lang;
    localStorage.setItem("atatakai-lang", state.lang);
    applyLanguage();
  });
});

document.getElementById("year").textContent = String(new Date().getFullYear());
setupNav();
setupMenuTabs();
setupMap();
setupForm();
applyLanguage();
