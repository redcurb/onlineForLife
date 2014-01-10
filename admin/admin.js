var onlineForLife = window.onlineForLife || {}; onlineForLife.Admin = onlineForLife.Admin || {};
onlineForLife.Admin = {
	addFirebaseChild:true,
	
	init: function(){
		onlineForLife.Admin.setupHandlers();
	},
	
	refreshed:false	
};
$(function() {
	onlineForLife.Admin.init();
});


