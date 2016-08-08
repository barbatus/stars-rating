Package.describe({
  name: 'barbatus:stars-rating',
  version: '1.1.0',
  summary: 'Stars rating control',
  git: 'https://github.com/barbatus/stars-rating',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom(['1.0.3.2', '1.2']);
  api.use([
    'less', 'underscore', 'jquery',
    'templating', 'ecmascript'
  ], 'client');
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
