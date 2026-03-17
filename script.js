const quoteList = document.getElementById("quote-list");
const pairs = [
  { symbol: "EUR/USD", price: 1.0874 },
  { symbol: "GBP/USD", price: 1.2721 },
  { symbol: "USD/JPY", price: 150.42 },
  { symbol: "AUD/USD", price: 0.6635 },
  { symbol: "USD/CAD", price: 1.3483 }
];

function renderQuotes() {
  quoteList.innerHTML = "";

  pairs.forEach((pair) => {
    const movement = (Math.random() * 0.001 - 0.0005).toFixed(4);
    pair.price = Number((pair.price + Number(movement)).toFixed(4));

    const li = document.createElement("li");
    const movementClass = Number(movement) >= 0 ? "up" : "down";
    const sign = Number(movement) >= 0 ? "+" : "";

    li.innerHTML = `
      <span class="pair">${pair.symbol}</span>
      <span class="price ${movementClass}">${pair.price.toFixed(4)} (${sign}${movement})</span>
    `;

    quoteList.appendChild(li);
  });
}

renderQuotes();
setInterval(renderQuotes, 3000);

document.getElementById("year").textContent = new Date().getFullYear();

const positionForm = document.getElementById("position-form");
const positionResult = document.getElementById("position-result");

positionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const balance = Number(document.getElementById("balance").value);
  const riskPercent = Number(document.getElementById("risk").value);
  const stopLoss = Number(document.getElementById("stopLoss").value);

  const amountAtRisk = balance * (riskPercent / 100);
  const pipValuePerStandardLot = 10;
  const lotSize = amountAtRisk / (stopLoss * pipValuePerStandardLot);

  positionResult.textContent = `Lot size: ${lotSize.toFixed(2)} standard lots (risking $${amountAtRisk.toFixed(2)})`;
});
