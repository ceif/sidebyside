
var map, mapleft, mapright, markers, marker, icon;

var mapleftLayers;
var maprightLayers;

var mousepositionleft;
var mousepositionright;

var myproj = 'EPSG:3763';
proj4.defs(myproj, "+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs");
ol.proj.get('EPSG:3763').setExtent([-121656.5849, -294200.8899, 172945.8815, 277430.8421]);
proj4.defs('EPSG:27493',"+proj=tmerc +lat_0=39.66666666666666 +lon_0=-8.131906111111112 +k=1 +x_0=180.598 +y_0=-86.98999999999999 +ellps=intl +units=m +no_defs");
ol.proj.get('EPSG:27493').setExtent([-121588.4107, -294117.6175, 173027.1548, 277526.4252]);





	var esri_orto = new ol.layer.Tile({
		title: 'Ortofotomapa ESRI',
		    source: new ol.source.XYZ({
			          attributions: [
			            new ol.Attribution({ html: 'Tiles &copy; <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ArcGIS</a>'})
			          ],
			              url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
	      	})
	    });

	

	var ovar_1995 = new ol.layer.Tile({
		title: 'ORTO 1995 (CM OVAR)',
		    source: new ol.source.TileArcGISRest({
			              url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/OrtosObras/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:5'},
					projection: 'EPSG:3763'
	      	})
	    });

	var ovar_2001 = new ol.layer.Tile({
		title: 'ORTO 2001 (CM OVAR)',
		    source: new ol.source.TileArcGISRest({
			              url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/OrtosObras/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:4'},
					projection: 'EPSG:3763'
	      	})
	    });		
		
	var ovar_2007 = new ol.layer.Tile({
		title: 'ORTO 2007 (CM OVAR)',
		    source: new ol.source.TileArcGISRest({
			              url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/OrtosObras/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:3'},
					projection: 'EPSG:3763'
	      	})
	    });	

	var ovar_2014 = new ol.layer.Tile({
		title: 'ORTO 2014 (CM OVAR)',
		    source: new ol.source.TileArcGISRest({
			              url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/OrtosObras/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:2'}
	      	})
	    });	

var ovar_2015 = new ol.layer.Tile({
	title: 'Orto 2014 (10cm)',
  preload: Infinity,
  visible: true,
  source: new ol.source.TileWMS(({ title: 'Limite Concelho',
    url: 'http://ows.dgterritorio.pt/wss/service/ortos2014-2015-wms/guest',
    params: {'LAYERS': 'LoteA', 'TILED': true, 'VERSION': '1.3.0',
      'FORMAT': 'image/png', 'WIDTH': 256, 'HEIGHT': 256, 'CRS': 'EPSG:3763'},
    serverType: 'geoserver'
    }))
  });		


// OVAR 

	var ovar_carto = new ol.layer.Tile({
		title: 'Cartografia 10k',
		    source: new ol.source.TileArcGISRest({
			              url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/INTER_Cartografia/MapServer',
					crossOrigin: 'anounymous'
	      	})
	    });
		
// OVAR 

	var ovar_pdm = new ol.layer.Group({
		title: 'PDM - Ordenamento',
		layers: [
				new ol.layer.Tile({
					title: 'Ovar CARTO',
					source: new ol.source.TileArcGISRest({
			        url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/OrtosObras/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:2'}
					})
					}),				
				new ol.layer.Image({
					title: 'Ovar PDM',
					opacity: 0.5,
					source: new ol.source.ImageArcGISRest({
			        url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/INTER_PDM/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:72','format':'png'},
					ratio: 1
					})
					})

					]
	});
	
// OVAR 

	var ovar_ren = new ol.layer.Group({
		title: 'PDM - Reserva Ecológica Nacional',
		layers: [
				new ol.layer.Tile({
					title: 'Ovar CARTO',
					source: new ol.source.TileArcGISRest({
			        url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/OrtosObras/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:2'}
					})
					}),				
				new ol.layer.Tile({
					title: 'Ovar PDM',
					opacity: 1,
					source: new ol.source.TileArcGISRest({
			        url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/INTER_PDM/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:12'}
					})
					})

					]
	});	
	
// OVAR 

	var ovar_ran = new ol.layer.Group({
		title: 'PDM - Reserva Agrícola Nacional',
		layers: [
				new ol.layer.Tile({
					title: 'Ovar CARTO',
					source: new ol.source.TileArcGISRest({
			        url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/OrtosObras/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:2'}
					})
					}),				
				new ol.layer.Tile({
					title: 'Ovar PDM',
					opacity: 1,
					source: new ol.source.TileArcGISRest({
			        url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/INTER_PDM/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:10'}
					})
					})

					]
	});		
		

// OVAR 

	var ovar_obras = new ol.layer.Group({
		title: 'OBRAS',
		layers: [
				new ol.layer.Tile({
					title: 'Ovar CARTO',
					source: new ol.source.TileArcGISRest({
			        url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/OrtosObras/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:2'}
					})
					}),				
				new ol.layer.Tile({
					title: 'Ovar PDM',
					opacity: 1,
					source: new ol.source.TileArcGISRest({
			        url: 'http://sig.cm-ovar.pt/arcgis/rest/services/Internet/INTER_Obras_emCurso/MapServer',
					crossOrigin: 'anounymous',
					params: {'LAYERS':'show:1'}
					})
					})

					]
	});
	


	var yandex = new ol.layer.Tile({
		title: 'Ortofotomapa Yandex',
		preload: Infinity,		
		    source: new ol.source.XYZ({

			              url: 'https://sat01.maps.yandex.net/tiles?l=sat&v=3.379.0&x={x}&y={y}&z={z}',
				projection: 'EPSG:3395',
			    tileGrid: ol.tilegrid.createXYZ({
      extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
	      	})
				})
	    });		
		
		

	mapleftLayers = [ovar_2014,ovar_2007,ovar_2001,ovar_1995,ovar_2015,esri_orto,  yandex,ovar_carto,ovar_pdm, ovar_ren, ovar_ran,ovar_obras  ];

	ovar_2014.setVisible(true);


	var layerSelectLeft = document.getElementById('SelectLeft');
	   for (var x = 0; x < mapleftLayers.length; x++) {
	       var option = document.createElement('option');
	       option.appendChild(document.createTextNode(mapleftLayers[x].get('title')));
	       option.setAttribute('value', x);
	       option.setAttribute('id', 'baseOption' + mapleftLayers[x].get('title'));
	       layerSelectLeft.appendChild(option);
	   }



	var changemapleft = function(index) {
	  mapleft.getLayers().getArray()[0].setVisible(false);
	  mapleft.getLayers().removeAt(0);
	  mapleft.getLayers().insertAt(0,mapleftLayers[index]);
	  mapleft.getLayers().getArray()[0].setVisible(true);
	}




	var maprightLayers = [esri_orto,  yandex,ovar_1995,ovar_2001,ovar_2007,ovar_2014,ovar_2015,ovar_carto,ovar_pdm, ovar_ren, ovar_ran,ovar_obras];

	esri_orto.setVisible(true);



	var layerSelectRight = document.getElementById('SelectRight');
	   for (var x = 0; x < maprightLayers.length; x++) {
	       var option = document.createElement('option');
	       option.appendChild(document.createTextNode(maprightLayers[x].get('title')));
	       option.setAttribute('value', x);
	       option.setAttribute('id', 'baseOption' + maprightLayers[x].get('title'));
	       layerSelectRight.appendChild(option);
	   }



	var changemapright = function(index) {
	  mapright.getLayers().getArray()[0].setVisible(false);
	  mapright.getLayers().removeAt(0);
	  mapright.getLayers().insertAt(0,maprightLayers[index]);
	  mapright.getLayers().getArray()[0].setVisible(true);
	}



	var mapleft = new ol.Map({
		  target: 'mapleft',
		  renderer: 'canvas',
		  controls: ol.control.defaults().extend([ new ol.control.ScaleLine({ units:'metric' }) ]),
		  layers: [ovar_2014],
		  logo: false,
		  view: new ol.View({
		    center: ol.proj.transform([-8.6252, 40.8592], 'EPSG:4326', 'EPSG:3857'),
		    zoom: 18
		  })
	});



    var mouseposition =  new ol.control.MousePosition({
            projection: 'EPSG:4326',
            coordinateFormat: function(coordinate) {
			var coord2193 =	ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3763');
		    var hdms = ol.coordinate.toStringHDMS(coordinate);
	        return '<strong>&nbsp;ETRS89: ' + Math.round(coord2193[0]) + ',&nbsp;' + Math.round(coord2193[1]) + '&nbsp;<br/>Lon/Lat: ' 
			+ ol.coordinate.format(coordinate, '{x}, {y}', 4) + '&nbsp; <br/>&nbsp;' + hdms + ' &nbsp;'; 
		}
      });

    mapleft.addControl(mouseposition);



	var mapright = new ol.Map({
		  target: 'mapright',
		  renderer: 'canvas',
		  controls: ol.control.defaults().extend([ new ol.control.ScaleLine({ units:'metric' }) ]),
		  layers: [esri_orto],
		  logo: false,
		  view: mapleft.getView()
	});

	  


    var mousepositionright =  new ol.control.MousePosition({
            projection: 'EPSG:4326',
            coordinateFormat: function(coordinate) {
			var coord2193 =	ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3763');
		    var hdms = ol.coordinate.toStringHDMS(coordinate);
	        return '<strong>&nbsp;ETRS89: ' + Math.round(coord2193[0]) + ',&nbsp;' + Math.round(coord2193[1]) + '&nbsp;<br/>Lon/Lat: ' 
			+ ol.coordinate.format(coordinate, '{x}, {y}', 4) + '&nbsp; <br/>&nbsp;' + hdms + ' &nbsp;'; 
		}
      });

    mapright.addControl(mousepositionright);



	var iconFeature = new ol.Feature();
		
		var iconStyle = new ol.style.Style({
		  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		    anchor: [10, 10],
		    anchorXUnits: 'pixels',
		    anchorYUnits: 'pixels',
		    src: 'point.png'
		  }))
		});
		
	
		iconFeature.setStyle(iconStyle);
	
		var vectorSource = new ol.source.Vector({
		  features: [iconFeature]
		});
		
		var vectorLayerMouseCross = new ol.layer.Vector({
		  source: vectorSource,
		  title: 'vectorMouseCross'
		});
	
	
		var mapleftlayerlength = mapleft.getLayers().getLength();
	    	mapleft.getLayers().insertAt(mapleftlayerlength,vectorLayerMouseCross);




		var RiconFeature = new ol.Feature();
		
		var iconStyle = new ol.style.Style({
		  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		    anchor: [10, 10],
		    anchorXUnits: 'pixels',
		    anchorYUnits: 'pixels',
		    src: 'point.png'
		  }))
		});
		
	
		RiconFeature.setStyle(iconStyle);
	
		var RvectorSource = new ol.source.Vector({
		  features: [RiconFeature]
		});
		
		var RvectorLayerMouseCross = new ol.layer.Vector({
		  source: RvectorSource,
		  title: 'RvectorMouseCross'
		});
	
		mapleft.addOverlay(vectorLayerMouseCross);
	
		var maprightlayerlength = mapright.getLayers().getLength();
	    	mapright.getLayers().insertAt(maprightlayerlength,RvectorLayerMouseCross);


 	mapright.on('pointermove', function(event) {

		RiconFeature.setGeometry(null);
                var coord3857 = event.coordinate;
		iconFeature.setGeometry( new ol.geom.Point(coord3857) );

	});

 	mapleft.on('pointermove', function(event) {
		iconFeature.setGeometry(null);
                var Rcoord3857 = event.coordinate;
		RiconFeature.setGeometry( new ol.geom.Point(Rcoord3857) );

	});



	jQuery("#header").on("mouseenter", function(event) {
		iconFeature.setGeometry(null);
		RiconFeature.setGeometry(null);
	});   






