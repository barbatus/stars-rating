Package.describe({
    name: 'barbatus:stars-rating',
    version: '0.6.0',
    summary: 'Stars rating control based on FontAwesome',
    git: 'https://github.com/barbatus/stars-rating',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0.3.2');
    api.use(['less', 'underscore', 'jquery', 'templating'], 'client');
    api.use(['fortawesome:fontawesome@4.2.0_2'], 'client');
    api.addFiles([
        'stars_rating.html',
        'stars_rating.js',
        'stars_rating.less'
    ], 'client');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('barbatus:stars-rating');
    api.addFiles('stars_rating-tests.js');
});
