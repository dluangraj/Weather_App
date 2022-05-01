// OpenWeather key
const weatherKey = 'ab500f6125e2569704a46cef46bf2fb3';

// OpenWeather API
const getData = async (city, zipCode) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${zipCode}&appid=${weatherKey}`)
    console.log(response.data)
    return response.data
};

// create a constance to hold DOM elements
const DOM_Elements = {
    cities: '.city-list'
}

// create City List HTML
const createCity =  (name, temp, temp_max, temp_min, humidity, main) => {
    let image = createImage(main)  
    const html = `<table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">City</th>
                            <th scope="col">Temperature</th>
                            <th scope="col">High</th>
                            <th scope="col">Low</th>
                            <th scope="col">Humidity</th>
                            <th scope="col">Weather</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${name}</td>
                            <td>${tempConverter(temp)}</td>
                            <td>${tempConverter(temp_max)}</td>
                            <td>${tempConverter(temp_min)}</td>
                            <td>${humidity}</td>
                            <td>${main}</td>
                        </tr>
                    </tbody>
                </table>
                
                <table class="table table-dark">
                    <tbody>
                        <tr>
                            <th scope="row"><img src="${image}" class="img-fluid" alt="Responsive image"></th>
                        </tr>    
                    </tbody>
                </table> `

    // paste list item on document
    document.querySelector(DOM_Elements.cities).insertAdjacentHTML('beforeend', html)
}

// create function to loop over city and create each element
const loadData = async (city, zipCode) => {
    clearData()
    const weather = await getData(city, zipCode);
    createCity(weather.name, weather.main.temp, weather.main.temp_max, weather.main.temp_min, weather.main.humidity, weather.weather[0].main)
}

// clear the data
const clearData = () => {
    document.querySelector(DOM_Elements.cities).innerHTML = '';
}

// create form variable
const form = document.querySelector('#testDataForm')
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let city = document.querySelector('#city').value
    let zipCode = document.querySelector('#zipcode').value
    console.log(event)
    await loadData(city, zipCode)
})

function tempConverter(x) {
    return parseInt((x - 273.15) * 9/5 + 32);
}

function createImage(x) {
    if (x == 'Clear') {
        return '/images/sunny.jpg'
    } else if (x == 'Clouds') {
        return '/images/cloudy.jpg'
    } else if (x == 'Rain') {
        return '/images/rainy.jpeg'
    } else if (x == 'Drizzle') {
        return '/images/drizzle.jpg'
    } else if (x == 'Snow') {
        return '/images/snow.jpg'    
    } else {
        return '/images/sunny.jpg'
    }
}