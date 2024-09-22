

const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const emojiField = document.querySelector(".weather_condition img");
const weatherField = document.querySelector(".weather_condition span");
const searchField = document.querySelector(".form-control");
const form = document.querySelector("form");


async function fetchdata(targetCity){
    //Making the api request
    try{
        const url = `https://api.weatherapi.com/v1/current.json?key=a34c6302aed0406da4011342241304&q=${targetCity}&aqi=no`

        const response = await fetch(url)

        const responsebody = await response.json()

        const currenttemp = responsebody.current.temp_c
        const currentCondition = responsebody.current.condition.text
        const locationName = responsebody.location.name
        const localTimeAndDate = responsebody.location.localtime
        const currentConditionEmoji = responsebody.current.condition.icon
        
        //Split local time into date and time

        const localdate = localTimeAndDate.split(" ")[0]
        const localtime = localTimeAndDate.split(" ")[1]

        const localDateJS = (new Date(localdate)).toLocaleDateString('en-us', {weekday:'long', year: 'numeric',
        month: 'long',
        day: 'numeric',})


        updateUI(currenttemp, locationName, `${localtime} ${localDateJS}`, currentConditionEmoji, currentCondition)
    } catch (error){
        console.log(error)
    }
}

document.getElementById('search-addon').addEventListener('click', function() {
    const searchTerm = document.querySelector('.form-control').value;
    
    let cityname = searchField.value
    fetchdata(cityname)
});

document.querySelector('.form-control').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('search-addon').click();
    }
});
function updateUI(temp, locationName, time, emoji, conditionName) {
    temperatureField.innerText = temp;
    cityField.innerText = locationName;
    emojiField.src = `https:${emoji}`;
    console.log(emoji)
    weatherField.innerText = conditionName;
    dateField.innerText = time;
}

