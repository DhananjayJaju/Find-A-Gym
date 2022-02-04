mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: gym1.geometry.coordinates, // starting position [lng, lat]
zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


const marker1 = new mapboxgl.Marker()
.setLngLat(gym1.geometry.coordinates)
.setPopup(
  new mapboxgl.Popup({offset: 25})
  .setHTML(
    `<h3>${gym1.title}</h3><p>${gym1.location}</p>`
  )
)
.addTo(map);