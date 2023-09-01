function floorTotalPrice(total: number): string {
    const price = String(total);
    const indexPoint = /\.\d+/.exec(price)?.index ?? 0;
    return price.slice(0, indexPoint) + price.slice(indexPoint, indexPoint + 3);
}

export default floorTotalPrice;