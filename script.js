const coins = [
  "bitcoin",
  "ethereum",
  "solana",
  "chainlink",
  "ripple",
  "zcash",
  "cardano",
  "sui",
  "avalanche-2",
  "dogecoin"
];

const coinNames = {
  "bitcoin": "Bitcoin (BTC)",
  "ethereum": "Ethereum (ETH)",
  "solana": "Solana (SOL)",
  "chainlink": "Chainlink (LINK)",
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
    const ids = coins.join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);

    if (!res.ok) throw new Error("API response not OK");

    const data = await res.json();

    grid.innerHTML = "";

    coins.forEach(coinId => {
      if (data[coinId]) {
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
      }
    });
  } catch (error) {
    console.error("Fetch error:", error);
    grid.innerHTML = `<p style="color:#ff4500;">Error loading prices. Please try the Refresh button again.</p>`;
  }
}

// Initial load
fetchPrices();

// Button functionality
document.getElementById("refresh-btn").addEventListener("click", () => {
  const btn = document.getElementById("refresh-btn");
  btn.textContent = "Updating Oracle...";
  fetchPrices().then(() => {
    btn.textContent = "Simulate Oracle Update";
  });
});
