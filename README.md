Stars rating control with two modes: fixed and mutable.

Among other features: colors cusomization and different star symbols.

Mutable mode allows input from the user.

In order to render markup with small font size use (or size='lg' for large):
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
For colors customization, add your own CSS class:
````js
{{> starsRating id='rating' class='mystar' mutable=true}}
````
and follow snippet:
````css
.mystar .current-rating {
  color: #color1;
}

.mystar .active {
  color: #color2;
}
````
It's possible to set a different star symbol.

For example, add Awesome font package and symbol configuring CSS class:
````css
.awesome {
  font-family: FontAwesome;
  content: '\f005';
}
````
then use it the template:
````js
{{> starsRating id='rating' class='awesome' mutable=true}}
````
You will see rating with Awesome stars.

Tested: IE9+, Firefox35+, Chrome40+

See demo: [stars-rating.meteor.com](http://stars-rating.meteor.com)
