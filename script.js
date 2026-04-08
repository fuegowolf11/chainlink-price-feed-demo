const coins = [
  "bitcoin",
  "ethereum",
  "solana",
  "ripple",        // XRP
  "zcash",
  "cardano",
  "sui",
  "avalanche-2",   // AVAX
  "dogecoin"       // DOGE
];

const coinNames = {
  "bitcoin": "Bitcoin (BTC)",
  "ethereum": "Ethereum (ETH)",
  "solana": "Solana (SOL)",
  "ripple": "XRP",
  "zcash": "Zcash (ZEC)",
  "cardano": "Cardano (ADA)",
  "sui": "SUI",
  "avalanche-2": "Avalanche (AVAX)",
  "dogecoin": "Dogecoin (DOGE)"
};

async function fetchPrices() {
  const grid = document.getElementById("price-grid");
  grid.innerHTML = "<p>Loading prices from simulated oracle...</p>";

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(",")}&vs_currencies=usd`);
    const data = await res.json();

    grid.innerHTML = "";

    coins.forEach(coinId => {
      const price = data[coinId].usd;
      const displayName = coinNames[coinId];

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${displayName}</h3>
        <div class="price">$${price.toLocaleString()}</div>
        <small>Simulated Chainlink Oracle Feed</small>
      `;
      grid.appendChild(card);
    });
  } catch (e) {
    grid.innerHTML = "<p>Error loading prices. Please try again.</p>";
  }
}

// Initial load
fetchPrices();

// Button simulates a new oracle update (exactly like a real Chainlink feed refresh)
document.getElementById("refresh-btn").addEventListener("click", () => {
  const btn = document.getElementById("refresh-btn");
  btn.textContent = "Updating Oracle...";
  fetchPrices().then(() => {
    btn.textContent = "Simulate Oracle Update";
  });
});
