// ===== SETTINGS =====
const PASSWORD = "VSE2k25";  // change this to your secret
const FINNHUB_KEY = "d3bm7n1r01qqg7bv706gd3bm7n1r01qqg7bv7070"; // <--- replace with your key

// 9 stocks (you can rename the labels but keep the real symbols)
let stocksConfig = [
  { label: "organiseing dept", symbol: "AAPL" },
  { label: "models dept", symbol: "MSFT" },
  { label: "tech dept", symbol: "GOOGL" },
  { label: "food", symbol: "AMZN" },
  { label: "stalls", symbol: "TSLA" },
  { label: "games", symbol: "META" },
  { label: "seminar", symbol: "NVDA" },
  { label: "photography", symbol: "JPM" },
  { label: "volenteer", symbol: "V" }
];

// ===== LOGIN =====
function login() {
  const input = document.getElementById("pw").value;
  if (input === PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("market").style.display = "block";
    loadStocks();
    setInterval(loadStocks, 10000); // refresh every 10s
  } else {
    document.getElementById("error").innerText = "Wrong password!";
  }
}

function logout() {
  document.getElementById("login").style.display = "block";
  document.getElementById("market").style.display = "none";
}

// ===== FETCH STOCK DATA =====
async function loadStocks() {
  const container = document.getElementById("stocks");
  container.innerHTML = "";
  for (let s of stocksConfig) {
    try {
      let url = `https://finnhub.io/api/v1/quote?symbol=${s.symbol}&token=${FINNHUB_KEY}`;
      let res = await fetch(url);
      let data = await res.json();
      let card = document.createElement("div");
      card.className = "stock-card";
      let change = data.d || 0;
      card.innerHTML = `
        <div class="stock-name">${s.label}</div>
        <div class="stock-symbol">${s.symbol}</div>
        <div class="price">$${data.c?.toFixed(2)}</div>
        <div class="change ${change>=0?'up':'down'}">
          ${change>=0?'+':''}${change.toFixed(2)} (${(data.dp||0).toFixed(2)}%)
        </div>
      `;
      container.appendChild(card);
    } catch (err) {
      console.error(err);
    }
  }
}

// ===== BACKGROUND COLOR =====
function changeBg(color) {
  document.body.style.setProperty("--bg", color);
}
