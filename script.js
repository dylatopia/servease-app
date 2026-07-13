const screens = [...document.querySelectorAll(".screen")];
const navItems = [...document.querySelectorAll(".nav-item")];
const toast = document.getElementById("toast");
const appShell = document.querySelector(".phone-shell");


const technicians = {
  "Pak Budi": {
    name: "Budi Wijaya",
    specialty: "Tukang AC",
    rating: "4.9 • 89 ulasan",
    jobs: "156",
    price: "Rp 150.000",
    image:"images/budi.jpeg"
  },
  "Bu Dewi": {
    name: "Dewi Larasati",
    specialty: "Tukang Listrik",
    rating: "4.7 • 74 ulasan",
    jobs: "89",
    price: "Rp 100.000",
    image:"images/dewi.jpeg"
  },
  "Pak Hendra": {
    name: "Hendra Saputra",
    specialty: "Tukang Plumbing",
    rating: "4.8 • 143 ulasan",
    jobs: "201",
    price: "Rp 120.000",
    image:"images/hendra.jpeg"
  },
  "Mas Rio": {
    name: "Rio Pratama",
    specialty: "Tukang Kayu",
    rating: "4.6 • 52 ulasan",
    jobs: "67",
    price: "Rp 200.000",
    image:"images/rio.jpeg"
  },
  "Bu Sari": {
    name: "Sari Melati",
    specialty: "Teknisi Elektronik",
    rating: "4.5 • 38 ulasan",
    jobs: "43",
    price: "Rp 80.000",
    image:"images/sari.jpeg"
  },
  "Pak Anton": {
    name: "Anton Mahendra",
    specialty: "Tukang Cat",
    rating: "4.8 • 91 ulasan",
    jobs: "112",
    price: "Rp 180.000",
    image:"images/anton.jpeg"
  }
};

let selectedTechnician = technicians["Pak Budi"];
let bookingCount = 0;

function showScreen(target) {
  screens.forEach((screen) => {
    screen.classList.toggle(
      "active",
      screen.dataset.screen === target
    );
  });

  appShell.classList.toggle(
    "auth-active",
    target === "login"
  );

  appShell.classList.toggle(
    "detail-active",
    target === "profile" ||
    target === "booking"
  );

  navItems.forEach((item) => {
    const navTarget = item.dataset.navTarget;

    const isActive =
      navTarget === target ||
      (target === "booking" &&
       navTarget === "search");

    item.classList.toggle("active", isActive);
  });
}



function setActiveFilter(filter) {
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.filter === filter);
  });

  document.querySelectorAll(".tech-card").forEach((card) => {
    const tags = card.dataset.tags;
    const visible = filter === "Semua" || filter === "Rating Tertinggi" || filter === "Harga Terendah" || tags.includes(filter);
    card.style.display = visible ? "flex" : "none";
  });
}

function openProfile(key) {
  selectedTechnician = technicians[key] || technicians["Pak Budi"];

  document.getElementById("profileName").textContent = selectedTechnician.name;
  document.getElementById("profileSpecialty").textContent = selectedTechnician.specialty;
  document.getElementById("profileRating").textContent = selectedTechnician.rating;
  document.getElementById("profileJobs").textContent = selectedTechnician.jobs;
  document.getElementById("bookingName").textContent = selectedTechnician.name;
  document.getElementById("profileImage").src = selectedTechnician.image;
  document.getElementById("bookingImage").src = selectedTechnician.image;

  document.getElementById("bookNow").textContent = `Pesan Sekarang — ${selectedTechnician.price}`;
  showScreen("profile");
}

function addOrderHistory() {
  bookingCount += 1;
  const history = document.getElementById("orderHistory");
  const card = document.createElement("article");
  const serviceName = selectedTechnician.specialty.replace("Tukang ", "").replace("Teknisi ", "");

  card.className = "history-card new";
  card.innerHTML = `
    <div>
      <strong>${serviceName} - ${selectedTechnician.name}</strong>
      <p>Booking baru #${bookingCount} • Pengerjaan berlangsung</p>
    </div>
    <span>Rp 215.000</span>
  `;

  history.prepend(card);
}

document.addEventListener("click", (event) => {
  const navButton = event.target.closest("[data-nav-target]");
  if (navButton) {
    showScreen(navButton.dataset.navTarget);
    return;
  }

  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    setActiveFilter(categoryButton.dataset.category);
    showScreen("search");
    return;
  }

  const profileButton = event.target.closest("[data-profile]");
  if (profileButton) {
    openProfile(profileButton.dataset.profile);
    return;
  }

  const filterChip = event.target.closest(".filter-chip");
  if (filterChip) {
    setActiveFilter(filterChip.dataset.filter);
    return;
  }

  const slot = event.target.closest(".slot");
  if (slot) {
    const group = slot.closest(".slot-grid") || slot.closest(".date-row");
    group.querySelectorAll(".slot").forEach((button) => button.classList.remove("active"));
    slot.classList.add("active");
  }
});

document.getElementById("bookNow").addEventListener("click", () => {
  showScreen("booking");
});

document.getElementById("loginButton").addEventListener("click", () => {
  showScreen("home");
});

document.getElementById("confirmBooking").addEventListener("click", () => {
  addOrderHistory();
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    showScreen("history");
  }, 1150);
});

document.getElementById("technicianSearch").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();

  document.querySelectorAll(".tech-card").forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const tags = card.dataset.tags.toLowerCase();
    card.style.display = name.includes(query) || tags.includes(query) ? "flex" : "none";
  });
});

document.getElementById("loginButton").addEventListener("click", () => {
  showScreen("home");
});

showScreen("login");