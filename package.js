Package.describe({
	name: 'barbatus:stars-rating',
	version: '1.1.0',
	summary: 'Stars rating control',
	git: 'https://github.com/barbatus/stars-rating',
	documentation: 'README.md',
});

Package.onUse(function (api) {
	api.versionsFrom('1.9');
	api.use(['less@2.7.1', 'underscore@1.0.10', 'jquery@1.11.9||3.0.0', 'templating', 'ecmascript@0.14.0'], 'client');
	api.addFiles(['stars_rating.html', 'stars_rating.js', 'stars_rating.less'], 'client');
});

Package.onTest(function (api) {
	api.use('tinytest');
	api.use('barbatus:stars-rating');
	api.addFiles('stars_rating-tests.js');
});
