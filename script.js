// --- Navigation Menu Toggle ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

document.addEventListener("click", function (event) {
  const isClickInsideMenu = navMenu.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);
  const menuIsOpen = navMenu.classList.contains("active");

  if (!isClickInsideMenu && !isClickOnHamburger && menuIsOpen) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});


// --- DOM Ready Logic ---
window.addEventListener("DOMContentLoaded", () => {
  // --- Theme Switch ---
  const switchInput = document.getElementById("switch");
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  switchInput.checked = savedTheme === "dark";

  switchInput.addEventListener("change", () => {
    const newTheme = switchInput.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // --- Footer Year ---
  const yearSpan = document.getElementById("datee");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Clock Widget ---
  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");
  const ampmEl = document.getElementById("ampm");
  const iconEl = document.getElementById("themeIcon");
  const clockWidget = document.getElementById("clockWidget");

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const displayHour = hours % 12 || 12;
    const timeStr = `${displayHour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
    const dateStr = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    timeEl.textContent = timeStr;
    ampmEl.textContent = ampm;
    dateEl.textContent = dateStr;

    const isNight = hours >= 18 || hours < 6;
    iconEl.textContent = isNight ? "🌙" : "☀️";

    // Update background class
    clockWidget.classList.remove("clock-day", "clock-night");
    clockWidget.classList.add(isNight ? "clock-night" : "clock-day");
  }

  updateClock();
  setInterval(updateClock, 1000);

  // --- Compact Clock Toggle on Mobile ---
  const compactClockBtn = document.getElementById("compactClock");
  let hideClockTimeout;

  if (compactClockBtn && clockWidget) {
    compactClockBtn.addEventListener("click", () => {
      clockWidget.classList.add("active");
      clearTimeout(hideClockTimeout);
      hideClockTimeout = setTimeout(() => {
        clockWidget.classList.remove("active");
      }, 3000);
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".footer-left form");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent actual submission to show toast

    // Optional: Submit form with AJAX (if needed), or just show toast
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then(() => {
        toast.classList.remove("hidden");
        toast.classList.add("show");

        form.reset(); // optional: reset form

        // Hide toast after 4 seconds
        setTimeout(() => {
          toast.classList.remove("show");
          toast.classList.add("hidden");
        }, 4000);
      })
      .catch((error) => {
        alert("Oops! Something went wrong.");
      });
  });
});



//mail logic


  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_z9j4foe", "template_jc13g69", this)
      .then(function () {
        alert("✅ Message sent successfully!");
      }, function (error) {
        alert("❌ Failed to send message. Please try again.");
        console.log(error);
      });

    this.reset();
  });

document.addEventListener("DOMContentLoaded", () => {
  const homeLink = document.getElementById("home-link");

  homeLink.addEventListener("click", (e) => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Check if user is already near top (Home section)
    if (scrollTop <= 100) {
      e.preventDefault(); // prevent default scroll
      location.reload();  // reload page
    }
    // Else: let it scroll to top normally
  });
});

