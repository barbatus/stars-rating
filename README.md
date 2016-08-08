Stars rating control with two modes: fixed and mutable.

Mutable mode allows input from the user.

Among other features: colors cusomization and different star symbols.

See demo: [stars-rating.meteor.com](http://stars-rating.meteor.com)

In order to render markup with small font size use (or ````size='lg'```` for large):
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
To access saved value, get element by ID and then:
````js
var rating = $('#rating').data('userrating');
````
For colors customization, add your own CSS class:
````js
{{> starsRating id='rating' class='mystar' mutable=true}}
````
and follow snippet:
````css
# Changes default color.
.mystar .current-rating {
  color: #color1;
}

# A color that highlights selected stars when user interacts with the control.
.mystar .active {
  color: #color2;
}
````
It's possible to set a different star symbol.

For example, add Awesome font package and CSS class setting font family:
````css
.awesome {
  font-family: FontAwesome;
}
````
then configure a star symbol in the template:
````js
{{> starsRating id='rating' star='\\f005' class='awesome' mutable=true}}
````
You will see rating with Awesome stars.

Tested: IE9+, Firefox35+, Chrome40+

## API

There are one event and one method supported via jQuery API.

To subscribe on the star value changes use `$('#rating').on('change', ...)`.

To reset a star do `$('#rating').trigger('reset')`.

