function ReloadPlugin(options) {
    this.options = options || {};
};

ReloadPlugin.prototype.apply = function(compiler) {
    const 
        io = require('socket.io')(8196),
        options = this.options;
        
    let 
        cache = {},
        reload = false;

    const newConnection = function() {
        const socket = io.connect('http://localhost:8196/');

        socket.on('reload', function() {
            window.location.reload();
        });
    };
    
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            if (options.checkReload) {
                reload = cache[htmlPluginData.outputName] != htmlPluginData.html;
                cache[htmlPluginData.outputName] = htmlPluginData.html;
            }

            htmlPluginData.html += '<script src="http://localhost:8196/socket.io/socket.io.js"></script>';
            htmlPluginData.html += '<script>var socket = io.connect("http://localhost:8196");socket.on("reload", function(){window.location.reload()});</script>'

            callback(null, htmlPluginData);
        });

        compilation.plugin('html-webpack-plugin-after-emit', function(htmlPluginData, callback) {
            if (reload) {
                io.emit('reload');
                reload = false;
            } else if (!options.checkReload) {
                io.emit('reload');
            }

            callback(null, htmlPluginData);
        });
    });
};

module.exports = ReloadPlugin;
