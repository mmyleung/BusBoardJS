import fetch from 'node-fetch';

async function fetchLiveArrivals() {
    const response = await fetch("https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals")
    return await response.json();
}

const arrivalData = await fetchLiveArrivals()
    arrivalData.sort((a, b) => a.timeToStation - b.timeToStation);
    arrivalData.map(arrival => 
    console.log(`Bus ${arrival.lineName} to ${arrival.towards} arriving in ${arrival.timeToStation}`))

