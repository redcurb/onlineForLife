var Redcurb = window.Redcurb || {}; Redcurb.Helpers = Redcurb.Helpers || {};
Redcurb.Helpers = {

	getParameterByName: function(name){
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

};

