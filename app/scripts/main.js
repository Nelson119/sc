'use strict';
/*eslint-disable new-cap, no-unused-vars, 
  no-use-before-define, no-trailing-spaces, 
  no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,
  comma-spacing,no-spaced-func,space-infix-ops,
  key-spacing */
/*global  $ */



$(function(){
	var scratchFg = $('.scratch-pad').attr('data-scratch-pattern');
	$('.scratch-pad').wScratchPad({
		size        : 30,          // The size of the brush/scratch.
		bg          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2P4zwAAAgEBAOIxSPwAAAAASUVORK5CYII=',  // Background (image path or hex color).
		fg          : scratchFg,  // Foreground (image path or hex color).
		realtime    : true,       // Calculates percentage in realitime.
		scratchDown : null,       // Set scratchDown callback.
		scratchUp   : null,       // Set scratchUp callback.
		scratchMove : function (e, percent) {
			if(percent > 60){
				gotoStage('scratch-done');
			}
		},       // Set scratcMove callback.
		cursor      : 'grab' // Set cursor.
	});
	var stages = ['index', 'legal', 'scratch', 'scratch-done', 'coupon'];
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
		$('body').addClass(stage);
	}

	$('#expired').countdown('2016/05/01', function(event) {
		var weeks = event.strftime('%w') * 1;
		var days = event.strftime('%d') * 1;
		var total = weeks * 7 + days;
		$(this).html(event.strftime(total + ' : %H : %M : %S'));
	});

});
