var OnlineForLife = window.OnlineForLife || {};
OnlineForLife.FeedDataOutput = OnlineForLife.FeedDataOutput || {};
OnlineForLife.FeedDataOutput = {
	init: function(){
		OnlineForLife.FeedDataOutput.getAppData();
	},	

	getAppData:function(){
		var url = 'js/JSON-feedData.js';
		var jqxhr = $.get(url, function(data){},'json');
		jqxhr.done(function(data) {
			OnlineForLife.FeedDataOutput.handleApiSuccess(data);
		});
		jqxhr.fail(function(data) {
			OnlineForLife.FeedDataOutput.handleApiError(data);
		});
	},	

	handleApiSuccess:function(response){
		console.log('handleApiSuccess');
		console.log(response);
		var string = '';
		$.each(response,function(key,value){
			console.log(value.Id.toString());
			string += value.Id.toString()+',\n';
		});
		console.log('=======================');
		console.log(string);
		
	},	

	handleApiError:function(response){
		console.log('handleApiError');
		console.log(response);
	}
	
};
$(function() {
	OnlineForLife.FeedDataOutput.init();
});
