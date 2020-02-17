// Grant CesiumJS access to your ion assets
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlOWUxNDBmNC05ZTI4LTQ2MGUtODQ2MS0yZDc4MzU5NTZkNDgiLCJpZCI6MjIyMTQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1ODE1NDE3OTB9.fQHRu0rJ85pvoNlIZJUq_vTGuOoqGagZvvoGxfI0zS0';

var viewer = new Cesium.Viewer('cesiumContainer');

//plot aircraft flight path
var aircraft = Cesium.IonResource.fromAssetId(73721)
    .then(function (resource) {
        return Cesium.KmlDataSource.load(resource, {
            camera: viewer.scene.camera,
            canvas: viewer.scene.canvas
        });
    })
    .then(function (dataSource) {
        return viewer.dataSources.add(dataSource);
    })
    .then(function (dataSource) {
        return viewer.zoomTo(dataSource);
    })
    .otherwise(function (error) {
        console.log(error);
    });


//Set bounds of our simulation time
var start = Cesium.DataSourceClock.startTime;
var stop = Cesium.DataSourceClock.stopTime;
Sandcastle.addDefaultToolbarButton(Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16)), function() {
    viewer.trackedEntity = undefined;
    viewer.zoomTo(viewer.entities, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90)));
});

//Make sure viewer is at the desired time.
//viewer.clock.startTime = start.clone();
//viewer.clock.stopTime = stop.clone();
//viewer.clock.currentTime = start.clone();
//viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
//viewer.clock.multiplier = 10;

//Set timeline to simulation bounds
//viewer.timeline.zoomTo(start, stop);

//Plot pipeline location
var pipeline = Cesium.IonResource.fromAssetId(73472)
    .then(function (resource) {
        return Cesium.KmlDataSource.load(resource, {
            camera: viewer.scene.camera,
            canvas: viewer.scene.canvas
        });
    })
    .then(function (dataSource) {
        return viewer.dataSources.add(dataSource);
    })
    .then(function (dataSource) {
        return viewer.zoomTo(dataSource);
    })
    .otherwise(function (error) {
        console.log(error);
    });


//Add button to track the entity as it moves
Sandcastle.addToolbarButton('View Aircraft', function() {
    viewer.trackedEntity = aircraft;
});

//Add button to view the path from the top down
Sandcastle.addDefaultToolbarButton('View Top Down', function() {
    viewer.trackedEntity = undefined;
    viewer.zoomTo(viewer.entities, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90)));
});

