const priceSlider = document.getElementById('priceSlider');

if (priceSlider) {
  noUiSlider.create(priceSlider, {
    start: [2000, 150000],
    connect: true,
    step: 1,
    range: {
      'min': 0,
      'max': 300000
    }
  });

  const inputMin = document.getElementById('priceSliderMin');
  const inputMax = document.getElementById('priceSliderNax');
  const inputs = [inputMin, inputMax];

  priceSlider.noUiSlider.on('update', function(values, handle){
		inputs[handle].value = Math.round(values[handle]);
	});

	const setPriceSlider = (i, value) => {
		let arr = [null, null];
		arr[i] = value;
		priceSlider.noUiSlider.set(arr);
	};

	inputs.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			setPriceSlider(index, e.currentTarget.value);
		});
	});
}