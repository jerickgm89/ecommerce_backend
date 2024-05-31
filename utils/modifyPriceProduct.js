const modifyPriceProduct = async (productById) => {
    let newPrice;
    let discountQuantity;
    const originalPrice = productById.priceProduct;

    if (productById.entityDiscounts.length) {
        for (const discount of productById.entityDiscounts) {
            if (discount.activeDiscount) {
                if (!!discount.idProduct && !discount.discountInGroup) {
                    newPrice = (1 - discount.quantity) * originalPrice;
                    discountQuantity = discount.quantity;
                    productById.discountPriceProduct = newPrice.toFixed(2);
                    break; // Si encontramos este caso, salimos del bucle
                }

                if (!discount.idProduct && discount.discountInGroup && discount.productsInDiscountGroup?.length) {
                    newPrice = (1 - discount.quantity) * originalPrice;
                    discountQuantity = discount.quantity;
                    productById.discountPriceProduct = newPrice.toFixed(2);
                }
            }
        }

        if (newPrice !== undefined) {
            await productById.save();
            await productById.reload();
        }
    }

    const responseModified = productById;
    responseModified.priceProduct = parseFloat(responseModified.priceProduct).toFixed(2);
    return responseModified;
};

module.exports = modifyPriceProduct;