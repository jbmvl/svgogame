(function(){

	window.Planet = Backbone.Model.extend({

		defaults : {
			id : "???",
			title : "Planet Title",
			text : "Bla bla bla",
			keywords : "word1, word2, word3, ..."
		},

		initialize : function Planet() {
			console.log('Planet Constructor');
		}
	});

	var viewport = viewport();
	var planetRayon = viewport.width/6;
	var universe = Raphael(0, 0, viewport.width, viewport.height);

	var tableEtoiles = [];

	for(var i=0; i<100; i++) {
		tableEtoiles[i] = {
			'x': Math.random()*viewport.width,
			'y': Math.random()*viewport.height,
			'r': Math.random()*0.5+0.3
		};
	}

	etoiles = [];

	for(var i in tableEtoiles) {
		etoiles[i] = universe.circle(tableEtoiles[i].x, tableEtoiles[i].y, tableEtoiles[i].r);
		etoiles[i].attr("fill", "#fff");
		etoiles[i].attr("stroke", "none");

		spaceAnimation(etoiles[i], tableEtoiles[i].r);
	}

	// Creates circle at x = 50, y = 40, with radius 10
	// var planet = universe.circle(viewport.width/2, viewport.height/2, planetRayon);
	// // Sets the fill attribute of the circle to red (#f00)
	// planet.attr();
	// planet.attr("stroke", "none");

	//var athmosphere = universe.circle(viewport.width/2, viewport.height/2, (planet.getBBox().width/2)+5);
	var athmosphere = universe.add([{
		'type': 'circle',
		'cx': viewport.width/2,
		'cy': viewport.height/2,
		'r': planetRayon,
		'fill': '#5ea189',
		'stroke': 'none'
	},{
		'type': 'circle',
		'cx': viewport.width/2,
		'cy': viewport.height/2,
		'r': planetRayon+5,
		'stroke': '#fff',
		'stroke-opacity': 0.3,
		'stroke-width': 10,
		'stroke-linejoin': 'bevel'
	}]);

	// Sets the stroke attribute of the circle to white
	// athmosphere.attr();
	// athmosphere.attr("stroke-opacity", 0.3);
	// athmosphere.attr("stroke-width", 10);
	// athmosphere.attr("stroke-linejoin", 'bevel');


	function viewport() {
		var e = window
		, a = 'inner';
		if ( !( 'innerWidth' in window ) ) {
			a = 'client';
			e = document.documentElement || document.body;
		}
		return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
	}

	function spaceAnimation(el, speedFactor) {
		if(el.attr('cx') > viewport.width)  el.attr('cx', 0);
		if(el.attr('cy') > viewport.height) el.attr('cy', 0);
		el.animate({cx: el.attr('cx')+10*speedFactor, cy: el.attr('cy')+5*speedFactor}, 1000, 'linear', function() {
			spaceAnimation(el, speedFactor);
		});

	}

})();