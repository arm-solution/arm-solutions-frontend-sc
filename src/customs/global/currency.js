export const currencyFormat = (currency) => {
    const total =  Number(currency).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return `₱${total}`;
};