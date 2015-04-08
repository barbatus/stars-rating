var rtCss = 'current-rating';
var prCss = 'percent';
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

    $el.find('.stars').removeClass(rtCss);
    $el.find('.stars').find('.percent').removeClass(prCss);

    $el.toggleClass(hasUserCss, isUser);
    for (var i = floor; i >= 0; i--) {
        getStarsEl($el, i).addClass(rtCss);
    }

    if (percent) {
        var $percentStar = getStarEl($el, ceil).addClass(prCss);
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
        if (this.isMutable || this.mutable) {
            var $this = $(event.currentTarget);
            var rating  = $this.data('stars');

            for (var i = rating; i >= 0; i--) {
                getStarsEl($this.parent(), i).addClass('active');
            }
        }
    },
    'mouseleave .stars': function(event) {
        if (this.isMutable || this.mutable) {
            var $this = $(event.currentTarget);
            $this.parent().find('.stars').removeClass('active');
        }
    },
    'click .stars': function(event) {
        if (this.isMutable || this.mutable) {
            var $this = $(event.currentTarget);
            var userRating = $this.data('stars');
            $this.parent().parent().data('userrating', userRating);
            var $parent = $this.parent();

            setRating($parent, userRating, true);
            $this.trigger('mouseleave');
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
