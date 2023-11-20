const LOCATION = {center: [37.623082, 55.75254], zoom: 9};
window.map = null;

main();
async function main() {
  await ymaps3.ready;
  const {YMap, YMapDefaultSchemeLayer, YMapControls} = ymaps3;

  const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

  map = new YMap(document.getElementById('_ymap'), {location: LOCATION}, [
	 new YMapDefaultSchemeLayer(),
	 new YMapControls({position: 'right'}, [new YMapZoomControl({})])
  ]);
}

ymaps3.ready.then(() => {
/*  manageMap.onclick = () => {
	 manageMap.innerHTML = !map ? 'Delete map' : 'Create map';
	 if (map) {
		map.destroy();
		map = null;
	 } else {
		main();
	 }
  };*/
});