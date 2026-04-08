const coins = ["bitcoin", "ethereum", "solana", "chainlink"];

async function fetchPrices() {
  const grid = document.getElementById("price-grid");
  grid.innerHTML = "<p>Loading prices...</p>";

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(",")}&vs_currencies=usd`);
    const data = await res.json();

    grid.innerHTML = "";

    coins.forEach(coin => {
      const price = data[coin].usd;
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${coin.toUpperCase()}</h3>
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

// Button click simulates new oracle update
document.getElementById("refresh-btn").addEventListener("click", () => {
  const btn = document.getElementById("refresh-btn");
  btn.textContent = "Updating Oracle...";
  fetchPrices().then(() => {
    btn.textContent = "Simulate Oracle Update";
  });
});
