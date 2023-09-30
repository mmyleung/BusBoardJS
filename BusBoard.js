import fetch from 'node-fetch';
import promptSync from 'prompt-sync';
const prompt = promptSync();

let postCode = prompt("Which postcode would you like to search for?");

async function fetchLatLon(postcode) {
    const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}`)
    return await response.json();
}

async function fetchStopPoints(lat, lon) {
    const response = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${lon}&stopTypes=NaptanPublicBusCoachTram&radius=50`)
    const data = await response.json();
    return data.stopPoints;
}

const latLonData = await fetchLatLon(postCode);
if(latLonData.status === 404) {
    console.log("Please enter a valid postcode")
} else {
    const lat = latLonData.result.latitude;
    const lon = latLonData.result.longitude;
    const stopPoints = await fetchStopPoints(lat, lon);
    const stopPointIds = [];
    stopPoints.map((stop) => {
        stopPointIds.push(stop.naptanId)
    })

    stopPointIds.map(async (id) => {
        const arrivalData = await fetchLiveArrivals(id);
        console.log(`${arrivalData[0].stationName} (${arrivalData[0].platformName})`);
        arrivalData.sort((a, b) => a.timeToStation - b.timeToStation);
        arrivalData.slice(0, 5).map(arrival => 
        console.log(`Bus ${arrival.lineName} to ${arrival.towards} arriving in ${arrival.timeToStation}`))
    })
}


async function fetchLiveArrivals(id) {
    const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${id}/Arrivals`)
    return await response.json();
}




