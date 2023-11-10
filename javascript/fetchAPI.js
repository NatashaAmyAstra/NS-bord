let APIResponse = null;
let Departures = null;
let g_loaded = false;
let currentPlatform = null;
let nextPlatform = null;
let activePlatform = 19;

fetchAPIData();
setInterval(fetchAPIData, 1000 * 2);

async function fetchAPIData() {
    const response = await fetch('https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?lang=dutch&station=ut', {
        method: 'GET',
        // request headers
        headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '0caa72b54130469296b7b20af6e9f868',}
    });
    const data = await response.json();
    
    if(data) updateAPIResponseData(data); 
}

function updateAPIResponseData(data) {
    g_loaded = true; // false until fetchAPIData succesfully obtained the NS api
    APIResponse = data; // save api data in a variable that can be called
    Departures = APIResponse.payload.departures; // save specificially the departures

    // get current and next train to arrive at chosen platform
    currentPlatform = Departures.filter(platform => platform.actualTrack == activePlatform)[0];
    nextPlatform = Departures.filter(platform => platform.actualTrack == activePlatform)[1];
}