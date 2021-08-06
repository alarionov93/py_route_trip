
// $(document).ready(function () {
	let myMap;
	ymaps.ready(init).then(function() {
		console.log('Ready.');
	});
    function init(){
        myMap = new ymaps.Map("ymaps", {
            center: [55.76, 37.64],
            zoom: 7
        });
        console.log('Init done.');
    }
    async function load_pts() {
	    let ref_pts = await fetch('get_pts', {method: 'GET'});
	    let multiRoute = new ymaps.multiRouter.MultiRoute({   
		    // Точки маршрута. Точки могут быть заданы как координатами, так и адресом. 
		    // referencePoints: [
		    //     'Москва, метро Смоленская',
		    //     'Москва, метро Арбатская',
		    //     [55.734876, 37.59308], // улица Льва Толстого.
		    // ]
		    referencePoints: ref_pts
		}, {
		    boundsAutoApply: true
		});

		myMap.geoObjects.add(multiRoute);
	};

// });