var onlineForLife = window.onlineForLife || {}; onlineForLife.Panels = onlineForLife.Panels || {};
onlineForLife.Panels = {
	init: function(){
		onlineForLife.Panels.setupHandlers();
	},
	
	hideArcs: function(){
		var $impact = $('.section-your-impact');
		var $logo = $('.stats-logo');
		var $arcs = $logo.find('.stats-logo-arc');
		var $textSpans = $impact.find('.impact-step span');
		
		$arcs.hide();
		$textSpans.hide();
	},
	
	animateArcs: function(){
		var $impact = $('.section-your-impact');
		var $logo = $('.stats-logo');
		var $called = $logo.find('.step-called');
		var $scheduled = $logo.find('.step-scheduled');
		var $visitedPrc = $logo.find('.step-visited-prc');
		var $choseLife = $logo.find('.step-chose-life');
		
		var $textCalled = $impact.find('.impact-step.step-called span');
		var $textScheduled = $impact.find('.impact-step.step-scheduled span');
		var $textVisitedPrc = $impact.find('.impact-step.step-visited-prc span');
		var $textChoseLife = $impact.find('.impact-step.step-chose-life span');
		
		$called.fadeIn(150, function(){
			$textCalled.fadeIn(150);
			
			//step 2
			$scheduled.fadeIn(150, function(){
				$textScheduled.fadeIn(150);

				//step 3
				$visitedPrc.fadeIn(150, function(){
					$textVisitedPrc.fadeIn(150);

					//step 4
					$choseLife.fadeIn(150, function(){
						$textChoseLife.fadeIn(150);
					});

				});

			});
			
			
			
		});
		
	},
	
	setupHandlers: function(){
		$('#panel-left').on('click',function(){
			$( "#mypanel-left" ).panel( "open" , {
					display:'reveal'
			} );
		});
		$('#panel-right').on('click',function(){
			$( "#mypanel-right" ).panel( "open" , {} );
		});

		$( "#mypanel-right").on( "panelopen", function( event, ui ) {
			setTimeout(function() {
				onlineForLife.Panels.animateArcs();
			},500);
		});
		
		$( "#mypanel-right").on( "panelclose", function( event, ui ) {
			onlineForLife.Panels.hideArcs();
		});
		
	}
	


};
$(function() {
	onlineForLife.Panels.init();
});


