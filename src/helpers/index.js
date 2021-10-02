export const copyToClipboard = (text, callback = null) => {
	function selectElementText(element) {
		if (document.selection) {
			let range = document.body.createTextRange();
			range.moveToElementText(element);
			range.select();
		} else if (window.getSelection) {
			let range = document.createRange();
			range.selectNode(element);
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
		}
	}

	let element = document.createElement('div');
	element.textContent = text;
	document.body.appendChild(element);
	selectElementText(element);
	document.execCommand('copy');
	element.remove();
	if (callback !== null) callback();
};

export const addClassesToLocalStorage = (classes) => {
	const savedGradients = window.localStorage.getItem('savedGradients');
	if (savedGradients) {
		const parsedSavedGradients = JSON.parse(savedGradients);
		!parsedSavedGradients.includes(classes) && parsedSavedGradients.push(classes);
		window.localStorage.setItem(
			'savedGradients',
			JSON.stringify(parsedSavedGradients)
		);
	} else {
		window.localStorage.setItem('savedGradients', JSON.stringify([classes]));
	}
};

export const debounce = (func, wait, immediate) => {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// generates a random integer between min(inclusive) & max(inclusive): [min, max]
export const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
