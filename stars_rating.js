var rtCss = 'current-rating';
var prCss = 'percent';
var hasUserCss = 'has-user-rating';

function getStarsEl($parent, index) {
    return $parent.find('[data-stars="' + index + '"]');
}

function getStarEl($parent, index) {
    return getStarsEl($parent, index).find('.star-' + index);
}

function getStarColor($el) {
    var span = $('<span>').addClass(rtCss).appendTo($el);
    var starColor = span.css('color');
    span.remove();
    return starColor;
}

function buildStyle(className, styles) {
    var styleStr = '';
    for (var style in styles) {
        styleStr += style + ':' + styles[style] + ';';
    }
    return '.' + className + '{' + styleStr + '}';
}

function setRating($el, rating, isUser, starGlyph) {
    var ceil = Math.ceil(rating);
    var floor = Math.floor(rating);
    var percent = rating - floor;

    $el.find('.stars').removeClass(rtCss);
    $el.find('.stars').find('.percent').removeClass(prCss);

    $el.toggleClass(hasUserCss, isUser);
    for (var i = floor; i >= 0; i--) {
        getStarsEl($el, i).addClass(rtCss);
    }

    if (percent) {
        var $percentStar = getStarEl($el, ceil).addClass(prCss);
        var starColor = getStarColor($el);
        $percentStar.find('style').remove();
        var style = ['<style>#' + getOrSetTmplId(),
            buildStyle('percent:before', {
                width: (percent * 100) + '% !important',
                color: starColor,
                content: starGlyph}), '</style>'];
        $percentStar.append(style.join(' '));
    }
    $el.trigger('change');
}

function getOrSetTmplId(opt_id) {
    if (!Template.instance()._id) {
        Template.instance()._id = opt_id || _.uniqueId('stars_');
    }
    return Template.instance()._id;
}

Template.starsRating.helpers({
    getId: function() {
        return getOrSetTmplId(this.id);
    },
    css: function(size) {
        if (_.isString(size)) {
            return 'stars-rating-' + (size || 'sm');
        }
    },
    font: function(size) {
        if (_.isNumber(size)) {
            return 'font-size:' + size + 'px';
        }
    }
});

function onDataChange($el, rating, starGlyph) {
    setRating($el, rating, false, starGlyph);
}

Template.starsRating.rendered = function() {
    var self = this;
    var $el = $(self.firstNode);
    var starGlyph = '"' + $el.css('content').replace(/[\',\"]/g, '') + '"';
    var style = ['<style>#' + getOrSetTmplId(),
        buildStyle('star-glyph:before', {
            content: starGlyph}), '</style>'];
    $el.append(style.join(' '));

    this.autorun(function() {
        var userData = Template.currentData();
        if (userData) {
            var rating = userData.rating;
            if (rating) {
                onDataChange($el, rating, starGlyph);
            }
        }
    });
};

Template.starsRating.events({
    'mouseover .stars': function(event) {
        if (this.isMutable || this.mutable) {
            var $this = $(event.currentTarget);
            var rating = $this.data('stars');

            for (var i = rating; i >= 0; i--) {
                getStarsEl($this.parent(), i).addClass('active');
            }

            for (var i = rating + 1; i <= 5; i++) {
                getStarsEl($this.parent(), i).removeClass('active');
            }
        }
    },
    'mouseleave .stars-rating': function(event) {
        if (this.isMutable || this.mutable) {
            var $this = $(event.currentTarget);
            $this.find('.stars').removeClass('active');
        }
    },
    'click .stars': function(event) {
        if (this.isMutable || this.mutable) {
            var $this = $(event.currentTarget);
            var userRating = $this.data('stars');
            var $el = $this.parent().parent();
            $el.data('userrating', userRating);

            var $starsWrap = $this.parent();
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
