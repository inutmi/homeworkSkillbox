export function calculateDiscount(price, percent) {
  try {
    if (typeof price !== "number" || typeof percent !== "number") {
      throw new TypeError("Arguments must be numbers");
    }
    console.log((price / 100) * percent);
    return (price / 100) * percent;
  } catch (error) {
    console.log(error.name);
    throw error;
  }
}

export function getMarketingPrice(product) {
  try {
      const productObject = JSON.parse(product);
      return productObject.prices.marketingPrice;
      } catch (error) {
      error = true;
      return null}
    }

// Функция имитирует неудачный запрос за картинкой
function fetchAvatarImage(userId) {
  return new Promise((resolve, reject) => {
    resolve('/images/default.jpg')
    reject(new Error(`Error while fetching image for user with id ${userId}`));
  });
}

export async function getAvatarUrl(userId) {
  const image = await fetchAvatarImage(userId);
  return image;
}
