const catalogueCard = document.querySelectorAll('.catalogue__card')
const catalogueMore = document.querySelector('.catalogue__more')
let catalogueShownCards

if (document.body.clientWidth > 1240) {
  catalogueShownCards = 8
} else if (document.body.clientWidth < 1001) {
  catalogueShownCards = 8
} else {
  catalogueShownCards = 9
}

for (let i = catalogueCard.length - 1; i > catalogueShownCards - 1; i--) {
  catalogueCard[i].classList.add("hidden");
  catalogueCard[i].style.display = "none";
}

catalogueMore.addEventListener("click", () => {
  if (catalogueCard.length > catalogueShownCards) {
    [...catalogueCard]
      .slice(catalogueShownCards - 1, catalogueShownCards + 4)
      .forEach((card) => {
        card.style.display = "flex";
        card.classList.remove("hidden");
      });
    catalogueShownCards += 4;
  } 
  if (catalogueShownCards == catalogueCard.length) {
    catalogueMore.style.display = 'none'
  }
});
