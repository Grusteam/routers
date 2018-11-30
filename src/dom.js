export const
	append = (parent, content) => {
		const
			prevHtml = parent.innerHTML,
			reg = /(?<=<)(.*)(?= )/i,
			tagname = content.match(reg)[0],
			domEl = document.createElement(tagname);

		// console.log('content', content);
		// console.log('tagname', tagname);
		// console.log('domEl', domEl);

		parent.appendChild(domEl);

		return domEl;
	};

const DOM_UTILS = {
	append
};

export default DOM_UTILS;