import fetch from 'node-fetch';

fetch("https://api.tfl.gov.uk/StopPoint/490008660N")
    .then(response => response.json())
    .then(body => console.log(body));