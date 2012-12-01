var configuration = require('./Life.js');
configuration.initialize();
configuration.print();
setInterval(function () {
	configuration.update();
	configuration.print();
}, 50);
