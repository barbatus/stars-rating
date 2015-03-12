Stars rating control based on FontAwesome with two modes: fixed and mutable.

Mutable mode allows input from the user.

In order to render markup with small font size use:
````html
{{> starsRating rating=4.5 size='sm'}}
````
if you want user to iteract with the control and set a rating use:
````html
{{> starsRating id='rating' isMutable=true}}
````
To access saved value:
````js
var rating = $('#rating').data('userrating');
````
