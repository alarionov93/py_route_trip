
// $(document).ready(function () {
	let myMap;
	ymaps.ready(init).then(function() {
		console.log('Ready.');
	});
    async function init(){
        myMap = new ymaps.Map("ymaps", {
            center: [55.76, 37.64],
            zoom: 7
        });
        console.log('Init done.');

        let ref_pts = await load_pts();

        let multiRoute = new ymaps.multiRouter.MultiRoute({   
		    // Точки маршрута. Точки могут быть заданы как координатами, так и адресом. 
		    // referencePoints: [
		    //     'Москва, метро Смоленская',
		    //     'Москва, метро Арбатская',
		    //     [55.734876, 37.59308], // улица Льва Толстого.
		    // ]
		    referencePoints: ref_pts,
		    params: {
                //Тип маршрутизации - пешеходная маршрутизация.
                routingMode: 'pedestrian'
                // routingMode: 'bycicile'
                // FIXME: Yandex Maps API can not create route on roads that exists on map!!!
            }
		}, {
		    boundsAutoApply: true
		});

        myMap.geoObjects.add(multiRoute);
    }
    async function load_pts() {
	    let resp = await fetch('get_pts', {method: 'GET'});
	    let ref_pts = await resp.json();

	    return ref_pts;
	};

// });