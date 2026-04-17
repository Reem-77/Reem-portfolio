// sc.js 
document.addEventListener("DOMContentLoaded", () => {
  try {
    // ---- 1) عناصر القائمة ----
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.querySelector(".nav-links");
    const navAnchors = document.querySelectorAll(".nav-links a");

    if (!menuIcon) console.warn("menuIcon element not found (#menu-icon).");
    if (!navLinks) console.warn("navLinks element not found (.nav-links).");

    // Toggle menu (mobile)
    if (menuIcon && navLinks) {
      menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // toggle icon class (FontAwesome: fa-bars <-> fa-xmark)
        menuIcon.classList.toggle("fa-bars");
        menuIcon.classList.toggle("fa-xmark");
        // aria
        const expanded = navLinks.classList.contains("active");
        menuIcon.setAttribute("aria-expanded", expanded ? "true" : "false");
      });
    }

    // Close nav when clicking a link + smooth scroll
    if (navAnchors.length && navLinks) {
      navAnchors.forEach((a) => {
        a.addEventListener("click", (e) => {
          // If href is an in-page anchor -> smooth scroll (handled below too)
          const href = a.getAttribute("href");
          if (href && href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
          // close menu on mobile
          if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            if (menuIcon) {
              menuIcon.classList.remove("fa-xmark");
              menuIcon.classList.add("fa-bars");
              menuIcon.setAttribute("aria-expanded", "false");
            }
          }
        });
      });
    }

    // ---- 2) Reveal on scroll (fallback simple) ----
    function reveal() {
      const reveals = document.querySelectorAll(".reveal, .fade-in");
      const windowHeight = window.innerHeight;
      reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add("active");
        }
      });
    }
    window.addEventListener("scroll", reveal);
    // run once
    reveal();

    // ---- 3) Active nav link on scroll ----
    const sections = document.querySelectorAll("section[id]");
    const navLinksA = document.querySelectorAll(".nav-links a");

    function navHighlight() {
      let currentId = "";
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (pageYOffset >= top - height / 3) {
          currentId = sec.getAttribute("id");
        }
      });
      navLinksA.forEach((link) => {
        link.classList.remove("active-link");
        const href = link.getAttribute("href") || "";
        if (href.includes(currentId) && currentId !== "") {
          link.classList.add("active-link");
        }
      });
    }
    window.addEventListener("scroll", navHighlight);
    navHighlight();

    // ---- 4) Button hover fallback (keeps existing behavior) ----
    const buttons = document.querySelectorAll(".btn, .visit-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.05)";
        btn.style.transition = "transform 0.25s ease";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
      });
    });

    // ---- 5) Initialize AOS if loaded ----
    if (typeof AOS !== "undefined") {
      AOS.init({ duration: 1200, once: true, offset: 100, easing: "ease-in-out" });
    } else {
      // لا مشكلة — نكمل بدون AOS
      // console.warn("AOS not loaded.");
    }

    // ---- 6) optional: click outside to close nav (mobile) ----
    document.addEventListener("click", (ev) => {
      if (!navLinks || !menuIcon) return;
      const target = ev.target;
      // إذا القائمة مفتوحة، ونقرنا خارجها وأيضاً خارج أيقونة القائمة -> أغلقها
      if (navLinks.classList.contains("active") && !navLinks.contains(target) && !menuIcon.contains(target)) {
        navLinks.classList.remove("active");
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
        menuIcon.setAttribute("aria-expanded", "false");
      }
    });

    // Ready
    // console.log("sc.js loaded and running!");
  } catch (err) {
    console.error("Error in sc.js:", err);
  }
});

(function () {
  emailjs.init("Wqy1D3meQQWBp8qlG"); // ضع المفتاح العام الخاص بك
})();

// ✅ إرسال البريد
function sendMail() {
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_nlik3vh"; // ← ضعي Service ID الخاص بك
  const templateID = "template_hzuebwf"; // ← ضعي Template ID الخاص بك

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("status").innerHTML =
        "✅ Message sent successfully!";
      document.getElementById("status").style.color = "#00ffff";
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    })
    .catch((err) => {
      document.getElementById("status").innerHTML =
        "❌ Failed to send, please try again.";
      document.getElementById("status").style.color = "#ff5555";
      console.error(err);
    });
}








