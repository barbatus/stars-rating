'use strict';

const rtCss = 'current-rating';
const prCss = 'percent';
const hasUserCss = 'has-user-rating';

function getStarsEl($parent, index) {
  return $parent.find(`[data-stars="${index}"]`);
}

function getPercentStarEl($parent, index) {
  return getStarsEl($parent, index).find('.star-' + index);
}

function getStarColor($el) {
  let span = $('<span>').addClass(rtCss).appendTo($el);
  let starColor = span.css('color');
  span.remove();
  return starColor;
}

function getStarGlyph($el) {
  let starGlyph = $el.attr('star');

  if (!starGlyph) {
    // For compatibility with older versions.
    //
    // If now star attr is set, take the star symbol
    // from the upper CSS class (via content property).
    // This will work in most browsers except IE.
    starGlyph = $el.css('content');

    if (!starGlyph || starGlyph === 'none') {
      starGlyph = '\\2605';
    } else {
      // if it's IE replace glyph with the default symbol.
      if (starGlyph === 'normal') {
          starGlyph = '\\2605';
      }
    }
  }

  // Prepare glyph for styles.
  starGlyph = '"' + starGlyph.trim().replace(/[\',\"]/g, '') + '"';

  return starGlyph;
}

function buildStyle(className, styles) {
  let styleStr = '';
  for (let style in styles) {
    styleStr += `${style}:${styles[style]};`;
  }
  return `.${className} {${styleStr}};`;
}

function setRating($el, rating, isUser, starGlyph) {
    let ceil = Math.ceil(rating);
    let floor = Math.floor(rating);
    let percent = rating - floor;

    $el.find('.stars').removeClass(rtCss);
    $el.find('.stars').find('.percent').removeClass(prCss);

    $el.toggleClass(hasUserCss, isUser);
    for (let i = floor; i >= 0; i--) {
      getStarsEl($el, i).addClass(rtCss);
    }

    if (percent) {
      let $perStar = getPercentStarEl($el, ceil).addClass(prCss);
      let starColor = getStarColor($el);
      $perStar.find('style').remove();
      let style = `
        <style>
          #${getOrSetTmplId()} ${
              buildStyle('percent:before', {
                width: (percent * 100) + '% !important',
                color: starColor,
                content: starGlyph
              })
            }
        </style>
      `;
      $perStar.append(style);
    }
    $el.trigger('change');
}

function addjQuryApi($el) {
  $el.bind('reset', function() {
    $el.find('.stars').removeClass(rtCss);
    $el.find('.stars').find('.percent').removeClass(prCss);
  });
}

function destroyApi($el) {
  if ($el) {
    $el.unbind('reset');
  } else {
    console.log("warning: $el no longer valid")
  }
}

function getOrSetTmplId(opt_id) {
  if (!Template.instance()._id) {
    Template.instance()._id = opt_id || _.uniqueId('stars_');
  }
  return Template.instance()._id;
}

Template.starsRating.helpers({
  getId() {
    return getOrSetTmplId(this.id);
  },
  css(size) {
    if (_.isString(size)) {
      return 'stars-rating-' + (size || 'sm');
    }
  },
  font(size) {
    if (_.isNumber(size)) {
      return 'font-size:' + size + 'px';
    }
  }
});

function onDataChange($el, rating, starGlyph) {
  setRating($el, rating, false, starGlyph);
}

Template.starsRating.destroyed = function() {
  let self = this;
  let $el = $(self.firstNode);

  destroyApi($el);
};

Template.starsRating.rendered = function() {
  let self = this;
  let $el = $(self.firstNode);

  let starGlyph = getStarGlyph($el);

  addjQuryApi($el);

  // Adds all required styles to set new symbol for the internal
  // pseudo elements.
  let style = `
    <style>
      #${getOrSetTmplId()} ${
        buildStyle('star-glyph:before', {
          content: starGlyph
        })
      }
    </style>
  `;
  $el.append(style);

  this.autorun(() => {
    let userData = Template.currentData();
    if (userData) {
      let rating = userData.rating;
      if (rating !== undefined) {
        onDataChange($el, rating, starGlyph);
      }
    }
  });
};

Template.starsRating.events({
  'mouseover .stars': function(event) {
    if (this.isMutable || this.mutable) {
      let $this = $(event.currentTarget);
      let rating = $this.data('stars');

      for (let i = rating; i >= 0; i--) {
        getStarsEl($this.parent(), i).addClass('active');
      }

      for (let i = rating + 1; i <= 5; i++) {
        getStarsEl($this.parent(), i).removeClass('active');
      }
    }
  },
  'mouseleave .stars-rating': function(event) {
    if (this.isMutable || this.mutable) {
      let $this = $(event.currentTarget);
      $this.find('.stars').removeClass('active');
    }
  },
  'click .stars': function(event) {
    if (this.isMutable || this.mutable) {
      let $this = $(event.currentTarget);
      let userRating = $this.data('stars');
      let $el = $this.parent().parent();
      $el.data('userrating', userRating);

      let $starsWrap = $this.parent();
      setRating($starsWrap, userRating, true);

      $starsWrap.children().removeClass('active');
    }
  }
});

Template.starsRating.helpers({
  getMutable: function(size) {
    return this.isMutable || this.mutable;
  }
});

Template._stars.helpers({
  stars: function() {
    return _.range(1, this.size + 1);
  }
});
