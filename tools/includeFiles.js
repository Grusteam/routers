// includeFiles.js

const path = require('path');
const fs = require('fs');

function includeFiles(options) {
	// Configure  plugin with options
	this.options = options;
}

includeFiles.prototype.apply = function (compiler) {
	const options = this.options; // use options in compilator
	
	compiler.plugin("after-compile", function(compilation, callback) {
		const dir = path.resolve(__dirname, '../src/templates');

		if (compilation.contextDependencies.indexOf(dir) == -1) {
			compilation.contextDependencies.push(dir);
		}

		callback();
	});

	compiler.plugin('compilation', function (compilation) {
		// console.log('The compiler is starting a new compilation...');
		
		compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
			// console.log('compiler.fileDependencies', compilation);
			const
			templatesPath = 'src/templates/',
			templates = {};
			
			fs.readdirSync(templatesPath).forEach((file) => {
				templates[file] = fs.readFileSync(templatesPath + file, 'utf8');
			});

			Object.keys(templates).map((key, i) => {
				const
					value = templates[key];
					
				htmlPluginData.html = htmlPluginData.html.replace(new RegExp('//= templates/' + key, 'g'), value);
			});

			callback(null, htmlPluginData);
		});
	});

};

module.exports = includeFiles;