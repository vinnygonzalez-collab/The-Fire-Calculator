# The-Fire-Calculator
This is a financial freedom calculator I have created.

function calculateFIRE() {
    const currentSavings = parseFloat(document.getElementById('current-savings').value);
    const annualExpenses = parseFloat(document.getElementById('annual-expenses').value);
    const annualContribution = parseFloat(document.getElementById('annual-contribution').value);
    const expectedReturnRate = parseFloat(document.getElementById('return-rate').value);
    const resultDiv = document.getElementById('result');

    const targetNumber = annualExpenses * 25;
    let total = currentSavings;
    let years = 0;
    const annualGrowthRate = expectedReturnRate / 100;

    if (!Number.isFinite(currentSavings) || !Number.isFinite(annualExpenses) ||
        !Number.isFinite(annualContribution) || !Number.isFinite(expectedReturnRate) ||
        currentSavings < 0 || annualExpenses <= 0 || annualContribution < 0 || expectedReturnRate <= -100) {
        resultDiv.innerHTML = '<p class="error">Please check your values. Expenses must be above $0, and savings, contributions, and return rate must be valid.</p>';
        return;
    }

    while (total < targetNumber && years < 100) {
        total = (total + annualContribution) * (1 + annualGrowthRate);
        years++;
    }

    if (total >= targetNumber) {
        resultDiv.innerHTML = `
            <p class="result-label">Your projected timeline</p>
            <h2>${years === 0 ? 'You are financially free' : `${years} ${years === 1 ? 'year' : 'years'} to go`}</h2>
            <div class="result-details">
                <p><span>Target nest egg</span><strong>$${targetNumber.toLocaleString()}</strong></p>
                <p><span>Projected balance</span><strong>$${Math.round(total).toLocaleString()}</strong></p>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <p class="result-label">Your projected timeline</p>
            <h2>More than 100 years</h2>
            <p class="error">At this pace, your balance reaches $${Math.round(total).toLocaleString()} and does not reach the $${targetNumber.toLocaleString()} target.</p>
        `;
    }
}

document.getElementById('fire-form').addEventListener('submit', function (event) {
    event.preventDefault();
    calculateFIRE();
});
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FIRE Financial Freedom Calculator</title>
    <link rel="icon" type="image" href="images/calculator.webp">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="calculator-container">
        <div class="intro">
            <p class="eyebrow">Financial independence planning</p>
            <h1>The FIRE Calculator</h1>
            <p class="description">See how your savings, contributions, and investment returns work together.</p>
        </div>
        <form id="fire-form">
            <div class="input-grid">
                <label for="current-savings">Current savings <span>$</span>
                    <input type="number" id="current-savings" value="10000" min="0" step="1000" required>
                </label>
                <label for="annual-expenses">Annual expenses <span>$</span>
                    <input type="number" id="annual-expenses" value="40000" min="1" step="1000" required>
                </label>
                <label for="annual-contribution">Annual contribution <span>$</span>
                    <input type="number" id="annual-contribution" value="15000" min="0" step="1000" required>
                </label>
                <label for="return-rate">Expected return <span>%</span>
                    <input type="number" id="return-rate" value="7" min="-99" max="100" step="0.1" required>
                </label>
            </div>
            <button type="submit">Calculate my timeline<span aria-hidden="true">→</span></button>
        </form>
        <div id="result" aria-live="polite"></div>
        <p class="assumption">Uses the 25× rule: annual expenses multiplied by 25.</p>
    </div>
    
    <script src="app.js"></script>
</body>
</html>
* { box-sizing: border-box; }

:root {
    color: #19352f;
    background: #f3eee4;
    font-family: Georgia, 'Times New Roman', serif;
}

body {
    min-height: 100vh;
    margin: 0;
    display: grid;
    place-items: center;
    padding: 24px;
    background: radial-gradient(circle at 85% 10%, #d4e4d0 0, transparent 30%), #f3eee4;
}

.calculator-container {
    width: min(100%, 720px);
    padding: clamp(28px, 6vw, 58px);
    background: #fffdf8;
    border: 1px solid #d8d2c5;
    box-shadow: 12px 12px 0 #c7d7c0;
}

.intro { margin-bottom: 32px; }
.eyebrow, .result-label, .assumption { margin: 0; font: 700 0.75rem/1.2 Arial, sans-serif; letter-spacing: 0.12em; text-transform: uppercase; }
.eyebrow { color: #b25e3d; }
h1 { max-width: 520px; margin: 10px 0; font-size: clamp(2.6rem, 8vw, 5rem); line-height: 0.92; font-weight: 500; letter-spacing: -0.04em; }
.description { max-width: 440px; margin: 0; color: #5d6c65; font: 1rem/1.5 Arial, sans-serif; }
.input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
label { color: #5d6c65; font: 700 0.78rem/1.3 Arial, sans-serif; text-transform: uppercase; letter-spacing: 0.08em; }
label span { color: #b25e3d; }
input { display: block; width: 100%; margin-top: 8px; padding: 14px 12px; border: 1px solid #c8c9bf; border-radius: 0; color: #19352f; background: #f7f6f0; font: 1.1rem Georgia, serif; }
input:focus { outline: 2px solid #b25e3d; outline-offset: 2px; }
button { width: 100%; margin-top: 26px; padding: 16px 20px; border: 0; border-radius: 0; color: #fffdf8; background: #19352f; cursor: pointer; font: 700 0.8rem Arial, sans-serif; letter-spacing: 0.1em; text-transform: uppercase; }
button:hover { background: #b25e3d; }
button span { margin-left: 8px; font-size: 1.1rem; }
#result { margin-top: 34px; padding: 24px; border-left: 5px solid #b25e3d; background: #e8f0e3; }
#result h2 { margin: 8px 0 20px; color: #19352f; font-size: clamp(1.8rem, 5vw, 2.7rem); font-weight: 500; }
.result-label { color: #b25e3d; }
.result-details { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.result-details p { margin: 0; font: 0.8rem/1.4 Arial, sans-serif; }
.result-details span { display: block; color: #5d6c65; }
.result-details strong { display: block; margin-top: 4px; font: 1.25rem Georgia, serif; }
.error { margin: 0; color: #8e3e2b; font: 0.9rem/1.5 Arial, sans-serif; }
.assumption { margin-top: 18px; color: #78837b; font-size: 0.65rem; letter-spacing: 0.06em; }

@media (max-width: 520px) {
    body { padding: 12px; }
    .calculator-container { box-shadow: 6px 6px 0 #c7d7c0; }
    .input-grid, .result-details { grid-template-columns: 1fr; }
}
