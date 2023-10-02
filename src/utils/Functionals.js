function purchasable(count, cost, costIncrease) {
    let currentCost = cost;
    initializeCurrentCost();

    function initializeCurrentCost() {
        for (let i = 1; i < count; i++) {
            increaseCost();
        }
    }

    function increaseCost() {
        currentCost += costIncrease(currentCost);
    }

    function onBuy() {
        count += 1;
        increaseCost();
    }

    return {
        getCount: () => count,
        getCost: () => currentCost,
        buy: onBuy,
    }
}

export { purchasable }