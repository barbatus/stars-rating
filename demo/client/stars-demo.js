import { Template } from 'meteor/templating';
import { Mongo } from 'meteor/mongo';

Template.demo.events({
	'click .reset': function () {
		$('#rating').trigger('reset');
	},
});
