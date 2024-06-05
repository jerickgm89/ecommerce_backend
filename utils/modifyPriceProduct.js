const {EntityDiscounts} = require('../src/db.js');
const modifyPriceProduct = async (productById) => {
    let newPrice;
    const originalPrice = productById.priceProduct;
    
    if (productById.entityDiscounts.length) {
        for (const discount of productById.entityDiscounts) {
            if (discount.activeDiscount) {
                const discountExpirationDate = new Date(discount.expirationDate);
                const currentDate = new Date();
                
                if (discount.expirationDate && discountExpirationDate < currentDate) {
                    const discountExpiredUpdadeActiveDiscount = await EntityDiscounts.findByPk(discount?.idDiscount);
                    if (discountExpiredUpdadeActiveDiscount) {
                        discountExpiredUpdadeActiveDiscount.activeDiscount = false;
                        await discountExpiredUpdadeActiveDiscount.save();
                    } else {
                        console.log(`No se encontró el descuento con id ${discount?.idDiscount}`);
                    }
                    productById.discountPriceProduct = null;
                    await productById.save();
                    await productById.reload();
                    return productById
                } else if (discount.idProduct && !discount.discountInGroup) {
                    newPrice = (1 - discount.quantity) * originalPrice;
                    productById.discountPriceProduct = newPrice.toFixed(2);
<<<<<<< HEAD
                    break; // Si encontramos este caso, salimos del bucle
                }

                // if (!discount.idProduct && discount.discountInGroup && discount.productsInDiscountGroup?.length) {
                //     newPrice = (1 - discount.quantity) * originalPrice;
                //     discountQuantity = discount.quantity;
                //     productById.discountPriceProduct = newPrice.toFixed(2);
                // }
=======
                } else if (!discount.idProduct && discount.discountInGroup && discount.productsInDiscountGroup?.length) {
                    newPrice = (1 - discount.quantity) * originalPrice;
                    productById.discountPriceProduct = newPrice.toFixed(2);
                }
>>>>>>> 066bf7efa23b82b443edc2708eb13b446bb46987
            }
        }

        if (newPrice !== undefined) {
            await productById.save();
            await productById.reload();
        }
    }

    productById.priceProduct = parseFloat(productById.priceProduct).toFixed(2);
    return productById;
};

module.exports = modifyPriceProduct;