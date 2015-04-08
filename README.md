Stars rating control based on FontAwesome with two modes: fixed and mutable.

Mutable mode allows input from the user.

In order to render markup with small font size use (as well as large size='lg'):
````html
{{> starsRating rating=4.5 size='sm'}}
````
You also can set exact font size in pixels by:
````html
{{> starsRating rating=4.5 size=10}}
````
if you want user to iteract with the control and set a rating use:
````html
{{> starsRating id='rating' mutable=true}}
````
To access saved value:
````js
var rating = $('#rating').data('userrating');
````
See demo: [stars-rating.meteor.com](stars-rating.meteor.com)
