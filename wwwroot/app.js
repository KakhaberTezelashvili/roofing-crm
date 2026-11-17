const status = document.querySelector("#status");

const TRAVIS_COUNTY = {
  name: "Travis County",
  latitude: 30.2672,
  longitude: -97.7431,
  zoom: 11,
};

function setStatus(message) {
  if (status) {
    status.textContent = message;
  }
}

function loadMap() {
  const container = document.getElementById("map");

  if (!container || typeof L === "undefined") {
    setStatus("Map could not load. Check the network connection and refresh.");
    return;
  }

  const map = L.map(container, {
    zoomControl: true,
    scrollWheelZoom: true,
  }).setView([TRAVIS_COUNTY.latitude, TRAVIS_COUNTY.longitude], TRAVIS_COUNTY.zoom);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([TRAVIS_COUNTY.latitude, TRAVIS_COUNTY.longitude])
    .addTo(map)
    .bindPopup(`${TRAVIS_COUNTY.name} — search starts here`);

  map.whenReady(() => {
    map.invalidateSize();
    setStatus(`${TRAVIS_COUNTY.name} · map ready`);
  });

  window.addEventListener("resize", () => map.invalidateSize());
}

loadMap();
