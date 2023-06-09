function floorTotalPrice(total) {
    const price = String(total);
    const indexPoint = /\.\d+/.exec(price).index;
    return price.slice(0, indexPoint) + price.slice(indexPoint, indexPoint + 3);
}

export default floorTotalPrice;