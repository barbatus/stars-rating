var rtCss = 'current-rating';
var userRtCss = 'user-current-rating';
var hasUserCss = 'has-user-rating';

function getStarsEl($parent, index) {
    return $parent.find('[data-stars="'+ index +'"]');
}

function getStarEl($parent, index) {
    return getStarsEl($parent, index).find('.star-'+ index);
}

function setRating($el, rating, isUser) {
    var ceil = Math.ceil(rating);
    var floor = Math.floor(rating);
    var percent = rating - floor;

    $el.find('.stars').removeClass(rtCss + ' ' + userRtCss);
    $el.find('.stars').find('.percent').removeClass('percent');

    $el.toggleClass(hasUserCss, isUser);
    for (var i = floor; i >= 0; i--) {
        getStarsEl($el, i).addClass(isUser ? userRtCss : rtCss);
    }

    if (percent) {
        var $percentStar = getStarEl($el, ceil).addClass('percent');
        $percentStar.find('style').remove();
        var style = ['<style>', '#' + $el.attr('id'),
            '.percent:before{width:'+ (percent * 100) +'% !important;}', '</style>'];
        $percentStar.append(style.join(' '));
    }

    $el.trigger('change');
}

Template.starsRating.helpers({
    getId: function() {
        return this.id || _.uniqueId('stars_');
    },
    css: function(size) {
        return 'stars-rating-' + (size || 'lg');
    }
});

function onDataChange($el, id, rating) {
    $el.attr('id', id);
    setRating($el, rating, false);
}

Template.starsRating.rendered = function() {
    var self = this;
    var genId = _.uniqueId('stars_');
    this.autorun(function() {
        if (Template.currentData()) {
            var rating = Template.currentData().rating;
            var userId = Template.currentData().id;
            if (rating) {
                onDataChange($(self.firstNode), userId || genId, rating);
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

            setRating($parent, userRating, true);
            $this.trigger('mouseleave');
        }
    }
});
