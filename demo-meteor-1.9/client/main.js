import { Template } from 'meteor/templating';

import './main.html';

Template.demo.events({
	'click .reset': function () {
		$('#rating').trigger('reset');
	},
});
