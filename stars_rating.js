var rtCss = 'current-rating';
var userRtCss = 'user-current-rating';
var hasUserCss = 'has-user-rating';

function getStarsEl($parent, index) {
    return $parent.find('[data-stars="'+ index +'"]');
}

function getStarEl($parent, index) {
    return getStarsEl($parent, index).find('.star-'+ index);
}

function init($el) {
    var rating = $el.data('rating');
    var userRating = $el.data('userrating');

    $el.toggleClass(hasUserCss, !!userRating);

    setRating($el, userRating ? userRating : rating, !!userRating);
}

function setRating($el, rating, isUser) {
    var ceil = Math.ceil(rating);
    var floor = Math.floor(rating);
    var percent = rating - floor;

    $el.find('.stars').removeClass(rtCss + ' ' + userRtCss);
    $el.find('.stars').find('.percent').removeClass('percent');

    for (var i = floor; i >= 0; i--) {
        getStarsEl($el, i).addClass(isUser ? userRtCss : rtCss);
    }

    if (percent) {
        var $percentStar = getStarEl($el, ceil).addClass('percent');
        $percentStar.find('style').remove();
        var style = '<style>.percent:before{width:'+ (percent * 100) +'% !important;}</style>';
        $percentStar.append(style);
    }
}

Template.starsRating.helpers({
    getId: function() {
        return this.id || (this.isMutable && 'stars') || null;
    },
    css: function(size) {
        return 'stars-rating-' + (size || 'lg');
    }
});

Template.starsRating.rendered = function() {
    var self = this;
    this.autorun(function() {
        if (Template.currentData()) {
            var rating  = Template.currentData().rating;
            if (rating) {
                init($(self.firstNode));
            }
        }
    });
};

Template.starsRating.events({
    'mouseover .stars': function(event) {
        if (this.isMutable) {
            var $this = $(event.currentTarget);
            var rating  = $this.data('stars');

            for (var i = rating; i >= 0; i--) {
                getStarsEl($this.parent(), i).addClass('active');
            }
        }
    },
    'mouseleave .stars': function(event) {
        if (this.isMutable) {
            var $this = $(event.currentTarget);
            $this.parent().find('.stars').removeClass('active');
        }
    },
    'click .stars': function(event) {
        if (this.isMutable) {
            var $this = $(event.currentTarget);
            var userRating = $this.data('stars');
            $this.parent().parent().data('userrating', userRating);
            var $parent = $this.parent();
            $parent.addClass(hasUserCss);

            setRating($parent, userRating, true);
            $this.trigger('mouseleave');
        }
    }
});
