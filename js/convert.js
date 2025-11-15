const API_URL = "https://v6.exchangerate-api.com/v6/a52906b05cf0547eb05bfe81/latest/USD";

document.getElementById("convertBtn").addEventListener("click", async () => {
    const amount = parseFloat(document.getElementById("amount").value);
    const toCurrency = document.getElementById("currency").value;
    const resultInput = document.getElementById("result");

    if (isNaN(amount) || amount <= 0) {
        resultInput.value = "⚠️ Montant invalide";
        return;
    }

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Convert MAD -> USD -> target
        const rateUSDToMAD = 1 / data.conversion_rates.MAD;
        const rateUSDToTarget = data.conversion_rates[toCurrency];
        const rateMADToTarget = rateUSDToTarget * rateUSDToMAD;

        const converted = (amount * rateMADToTarget).toFixed(2);
        resultInput.value = `${converted} ${toCurrency}`;
    } catch (error) {
        resultInput.value = "Erreur de conversion";
        console.error("Erreur API :", error);
    }
});
