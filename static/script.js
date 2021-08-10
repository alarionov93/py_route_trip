
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

        // Поиск координат центра Нижнего Новгорода.
    // ymaps.geocode('Нижний Новгород', {
    //     /**
    //      * Опции запроса
    //      * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
    //      */
    //     // Сортировка результатов от центра окна карты.
    //     // boundedBy: myMap.getBounds(),
    //     // strictBounds: true,
    //     // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
    //     // Если нужен только один результат, экономим трафик пользователей.
    //     results: 10
    // }).then(function (res) {
    //         // Выбираем первый результат геокодирования.
    //         var firstGeoObject = res.geoObjects.get(0),
    //             // Координаты геообъекта.
    //             coords = firstGeoObject.geometry.getCoordinates(),
    //             // Область видимости геообъекта.
    //             bounds = firstGeoObject.properties.get('boundedBy');

    //         firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
    //         // Получаем строку с адресом и выводим в иконке геообъекта.
    //         firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

    //         // Добавляем первый найденный геообъект на карту.
    //         myMap.geoObjects.add(firstGeoObject);
    //         // Масштабируем карту на область видимости геообъекта.
    //         myMap.setBounds(bounds, {
    //             // Проверяем наличие тайлов на данном масштабе.
    //             checkZoomRange: true
    //         });

    //         /**
    //          * Все данные в виде javascript-объекта.
    //          */
    //         console.log('Все данные геообъекта: ', firstGeoObject.properties.getAll());
    //         /**
    //          * Метаданные запроса и ответа геокодера.
    //          * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderResponseMetaData.xml
    //          */
    //         console.log('Метаданные ответа геокодера: ', res.metaData);
    //         /**
    //          * Метаданные геокодера, возвращаемые для найденного объекта.
    //          * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderMetaData.xml
    //          */
    //         console.log('Метаданные геокодера: ', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData'));
    //         /**
    //          * Точность ответа (precision) возвращается только для домов.
    //          * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/precision.xml
    //          */
    //         console.log('precision', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.precision'));
    //         /**
    //          * Тип найденного объекта (kind).
    //          * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/kind.xml
    //          */
    //         console.log('Тип геообъекта: %s', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.kind'));
    //         console.log('Название объекта: %s', firstGeoObject.properties.get('name'));
    //         console.log('Описание объекта: %s', firstGeoObject.properties.get('description'));
    //         console.log('Полное описание объекта: %s', firstGeoObject.properties.get('text'));
    //         /**
    //         * Прямые методы для работы с результатами геокодирования.
    //         * @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeocodeResult-docpage/#getAddressLine
    //         */
    //         console.log('\nГосударство: %s', firstGeoObject.getCountry());
    //         console.log('Населенный пункт: %s', firstGeoObject.getLocalities().join(', '));
    //         console.log('Адрес объекта: %s', firstGeoObject.getAddressLine());
    //         console.log('Наименование здания: %s', firstGeoObject.getPremise() || '-');
    //         console.log('Номер здания: %s', firstGeoObject.getPremiseNumber() || '-');

    //         /**
    //          * Если нужно добавить по найденным геокодером координатам метку со своими стилями и контентом балуна, создаем новую метку по координатам найденной и добавляем ее на карту вместо найденной.
    //          */
    //         /**
    //          var myPlacemark = new ymaps.Placemark(coords, {
    //          iconContent: 'моя метка',
    //          balloonContent: 'Содержимое балуна <strong>моей метки</strong>'
    //          }, {
    //          preset: 'islands#violetStretchyIcon'
    //          });

    //          myMap.geoObjects.add(myPlacemark);
    //          */
    //     });

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