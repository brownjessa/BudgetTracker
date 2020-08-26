if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then((reg) => {
      console.log("Service worker registered.", reg);
    });
  });
}
let trasactions = [];
let myChart;
fetch("/api/transaction")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    transactions = data;
    populateTotal();
    populateTable();
    populateChart();
  });
function populateTotal() {
  // reduce transaction amounts to a single total value
  let total = transactions.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);
  let totalEl = document.querySelector("#total");
  totalEl.textContent = total;
}
