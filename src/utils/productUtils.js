function calPercentageValue(number, percentage) {
    return number * (percentage / 100);
}

export default function getDiscountedPrice(price, discountPercentage) {
    return (price - calPercentageValue(price, discountPercentage)).toFixed(2);
}


