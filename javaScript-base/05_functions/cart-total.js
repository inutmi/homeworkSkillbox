function calculate(cartAmount, numOfItems, promo) {
   let promoN = (promo == 'ДАРИМ300') ? 'ДАРИМ300' : (promo == 'СКИДКА15') ? 'СКИДКА15': null;
    let cartAmountN = Number(cartAmount);
    let numOfItemsN = Number(numOfItems);
    let cartAmountWithDiscount;
    if (promoN == 'ДАРИМ300' && cartAmountN <= 300) {
      cartAmountWithDiscount = 0;
      return cartAmountWithDiscount;
    } else if (promoN == 'ДАРИМ300' && numOfItemsN >= 10 && cartAmountN > 50100 && cartAmountN < 60000) {
      cartAmountWithDiscount = (cartAmountN - 300) * 0.95;
      return cartAmountWithDiscount;
    } else if (promoN == 'ДАРИМ300' && numOfItemsN >= 10 && cartAmountN > 60000) {
      cartAmountWithDiscount = Math.round(((cartAmountN - 300) * 0.95 - 50000) * 0.8 + 50000);
      return cartAmountWithDiscount;
    } else if (promoN == 'ДАРИМ300' && numOfItemsN >= 10) {
      cartAmountWithDiscount = (cartAmountN - 300) * 0.95;
      return cartAmountWithDiscount;
    } else if (promoN == 'ДАРИМ300' && cartAmountN > 50100) {
      cartAmountWithDiscount = Math.round((((cartAmountN - 300) - 50000) * 0.8) + 50000);
      return cartAmountWithDiscount;
    } else if (promoN == 'ДАРИМ300') {
      cartAmountWithDiscount = cartAmountN - 300;
      return cartAmountWithDiscount;
    } else if (promoN == 'СКИДКА15' && numOfItemsN >= 10 && (cartAmountN >= 21000 && cartAmountN < 60000)) {
      cartAmountWithDiscount = cartAmountN * 0.95;
      return cartAmountWithDiscount;
    } else if (promoN == 'СКИДКА15' && numOfItemsN >= 10 && cartAmountN >= 60000) {
      cartAmountWithDiscount = Math.round((((cartAmountN * 0.95) - 50000) * 0.8) + 50000) * .85;
      return cartAmountWithDiscount;
    } else if (promoN == 'СКИДКА15' && cartAmountN >= 21000 && cartAmount < 60000) {
      cartAmountWithDiscount = cartAmountN * 0.85;
      return cartAmountWithDiscount;
    } else if (promoN == 'СКИДКА15' && cartAmountN >= 20000 && cartAmountN < 21000) {
      cartAmountWithDiscount = cartAmountN * 0.85;
      return cartAmountWithDiscount;
    } else if (promoN == 'СКИДКА15' && cartAmountN >= 60000) {
      cartAmountWithDiscount = Math.round((((cartAmountN) - 50000) * 0.8) + 50000) * .85;
      return cartAmountWithDiscount;
    } else if (numOfItemsN >= 10 && cartAmountN > 50100 && cartAmountN < 70000) {
      cartAmountWithDiscount = cartAmountN * 0.95;
      return cartAmountWithDiscount;
    } else if (numOfItemsN >= 10 && cartAmountN >= 70000) {
      cartAmountWithDiscount = Math.round((((cartAmountN * 0.95) - 50000) * 0.8) + 50000);
      return cartAmountWithDiscount;
    } else if (numOfItemsN >= 10) {
      cartAmountWithDiscount = cartAmountN * 0.95;
      return cartAmountWithDiscount;
    } else if (cartAmount > 50000) {
      cartAmountWithDiscount = Math.round(((cartAmountN - 50000) * 0.8) + 50000);
      return cartAmountWithDiscount;
    } else {cartAmountWithDiscount = cartAmountN;  return cartAmountWithDiscount;}
    };
    export default calculate;
