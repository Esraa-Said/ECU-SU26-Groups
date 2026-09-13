function processOrders(orders) {
    let totalRevenue = 0;
    let successfulOrders = 0;
    let processedOrdersCount = 0;
    let consecutiveSkipped = 0;
    let totalStockFailures = 0;
    let stopMessage = null;

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        processedOrdersCount++;

        if (!order.stockAvailable) {
            totalStockFailures++;
        }

        if (order.status === "cancelled" || order.status === "invalid" || !order.stockAvailable) {
            consecutiveSkipped++;

            if (consecutiveSkipped === 3 || totalStockFailures === 3) {
                stopMessage = "System stopped due to critical failure";
                break;
            }

            continue;
        }

        consecutiveSkipped = 0;
        totalRevenue += order.amount;
        successfulOrders++;
    }

    return {
        totalRevenue,
        successfulOrders,
        processedOrdersCount,
        stopMessage
    };
}