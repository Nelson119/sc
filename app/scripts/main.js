'use strict';
/*eslint-disable new-cap, no-unused-vars, 
  no-use-before-define, no-trailing-spaces, 
  no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,
  comma-spacing,no-spaced-func,space-infix-ops,
  key-spacing */
/*global  $ */



$(function(){
	$('.scratch-pad').each(function(){
		var o = this;
		var scratchFg = $(o).attr('data-scratch-pattern');
		$(o).wScratchPad({
			size        : 30,          // The size of the brush/scratch.
			bg          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2P4zwAAAgEBAOIxSPwAAAAASUVORK5CYII=',  // Background (image path or hex color).
			fg          : scratchFg,  // Foreground (image path or hex color).
			realtime    : true,       // Calculates percentage in realitime.
			scratchDown : null,       // Set scratchDown callback.
			scratchUp   : null,       // Set scratchUp callback.
			scratchMove : function (e, percent) {
				// console.log($(o).hasAttr('data-group'));
				if($(o).attr('data-group')){
					var group = $(o).attr('data-group');
					$(o).attr('data-percent', percent);
					var result = true;
					$('[data-group=' + group + ']').each(function(i, d){
						percent = $(d).attr('data-percent') || 0;
						result = result && percent >= 60;
					});
					if(result){
						gotoStage('scratch-done');
					}
				}else{
					if(percent > 60){
						gotoStage('scratch-done');
					}	
				}
			},       // Set scratcMove callback.
			cursor      : 'grab' // Set cursor.
		});

	});
	var stages = ['index', 'legal', 'scratch', 'scratch-done', 'email', 'sms', 'thankyou', 'coupon'];
	$.each(stages, function(i, s){
		$('.btn-' + s).on('click', function(){
			gotoStage(s);
		});
	});

	function gotoStage(stage){
		$.each(stages, function(idx, rm){
			if(this !== stage){				
				$('body').removeClass(rm);
			}
		});
		if(stage === 'coupon'){
			$('.scratch-content .scratch-sample:visible').appendTo($('.scratch-result'));
		}
		$('body').addClass(stage);
	}

	var expiration = $('#expired').attr('data-expiration');
	$('#expired').countdown(expiration, function(event) {
		var weeks = event.strftime('%w') * 1;
		var days = event.strftime('%d') * 1;
		var total = weeks * 7 + days;
		$(this).html(event.strftime(total + ' : %H : %M : %S'));
	});

});
