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