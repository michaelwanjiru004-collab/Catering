const pairs = [
  { symbol: "EUR/USD", price: 1.0842, change: 0.18 },
  { symbol: "GBP/USD", price: 1.2728, change: -0.11 },
  { symbol: "USD/JPY", price: 149.61, change: 0.26 },
  { symbol: "AUD/USD", price: 0.6589, change: -0.07 },
  { symbol: "USD/CAD", price: 1.3514, change: 0.09 },
  { symbol: "USD/CHF", price: 0.8852, change: -0.03 }
];

const tickerGrid = document.getElementById("tickerGrid");

pairs.forEach((pair) => {
  const card = document.createElement("article");
  card.className = "ticker";
  const trendClass = pair.change >= 0 ? "up" : "down";
  const sign = pair.change >= 0 ? "+" : "";

  card.innerHTML = `
    <strong>${pair.symbol}</strong>
    <p>${pair.price.toFixed(4)}</p>
    <p class="${trendClass}">${sign}${pair.change.toFixed(2)}%</p>
  `;

  tickerGrid.appendChild(card);
});

const calcForm = document.getElementById("calcForm");
const calcResult = document.getElementById("calcResult");

calcForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const balance = Number(document.getElementById("balance").value);
  const risk = Number(document.getElementById("risk").value) / 100;
  const stopLoss = Number(document.getElementById("stopLoss").value);
  const pipValue = Number(document.getElementById("pipValue").value);

  const riskAmount = balance * risk;
  const lotSize = riskAmount / (stopLoss * pipValue);

  calcResult.textContent = `Recommended position size: ${lotSize.toFixed(2)} standard lots (Risk $${riskAmount.toFixed(2)}).`;
});
