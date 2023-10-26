

export const mergeClassName = (...classNames) => {
	// classNames => array.
	// console.log(classNames);
	// console.log(classNames.join(' '));

	// loại bỏ không phải string.
	return classNames
		.filter((cn) => {
			return typeof cn === 'string';
		})
		.join(' '); // ["a","b","c"].join('-') => 'a-b-c'
};

export const saveLocalStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key) => {
	const value = localStorage.getItem(key);
	if (value) {
	  try {
		return JSON.parse(value);
	  } catch (error) {
		console.error('Error parsing JSON from localStorage:', error);
		return null;
	  }
	}
	return null;
  };
  saveLocalStorage("TOKENCYBER",`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMTEvMDIvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA3NjA5NjAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDc3NTcyMDB9.jYwLdihIAtWFb2Knge-baquBX9pHt9Z8tScXQFuYk0Y`);
export const deleteKey = (key) => {
	localStorage.removeItem(key);
};
