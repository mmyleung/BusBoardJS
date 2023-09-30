import fetch from 'node-fetch';
import promptSync from 'prompt-sync';
const prompt = promptSync();

let postCode = prompt("Which postcode would you like to search for?");

async function fetchLatLon() {
    const response = await fetch(`https://api.postcodes.io/postcodes/${postCode}`)
    return await response.json();
}

async function fetchStopPoints() {
    const response = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${lon}&stopTypes=NaptanPublicBusCoachTram&radius=50`)
    const data = await response.json();
    return data.stopPoints;
}

const latLonData = await fetchLatLon();
const lat = latLonData.result.latitude;
const lon = latLonData.result.longitude;

// async function fetchLiveArrivals() {
//     const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${stopPointId}/Arrivals`)
//     return await response.json();
// }

// const arrivalData = await fetchLiveArrivals()
//     arrivalData.sort((a, b) => a.timeToStation - b.timeToStation);
//     arrivalData.slice(0, 5).map(arrival => 
//     console.log(`Bus ${arrival.lineName} to ${arrival.towards} arriving in ${arrival.timeToStation}`))

const stopPoints = await fetchStopPoints();
const stopPointIds = [];
stopPoints.map((stop) => {
    stopPointIds.push(stop.naptanId)
})

console.log(stopPointIds);