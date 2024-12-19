const apiKey = '7b6bf70b202594fbe39622cca9120de7'

let selectedLat = null
let selectedLon = null

async function fetchSuggestions(query) {
  if (!query) return []

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
  )

  return response.json()
}

async function fetchWeather(lat, lon) {
  if (!lat || !lon) throw new Error('Coordinates must be provided')

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )

  if (!response.ok) throw new Error('City not found')

  return response.json()
}

$('.city').on(
  'input',
  _.debounce(async (event) => {
    const query = event.target.value.trim()
    const cities = await fetchSuggestions(query)

    $('.suggestions').html(`
      <ul class="list-group">
        ${cities
          .map(
            (city) =>
              `<li class="list-group-item" data-lat="${city.lat}" data-lon="${city.lon}">${city.name}, ${city.country}</li>`
          )
          .join('')}
      </ul>
    `)

    $('.list-group-item').on('click', function () {
      const city = $(this).text()
      selectedLat = $(this).data('lat')
      selectedLon = $(this).data('lon')

      $('.city').val(city)
      $('.suggestions').html('')
    })
  }, 500)
)

$('.search').on('click', async () => {
  const weatherDiv = $('.weather')
  const errorDiv = $('.error')
  weatherDiv.html('')
  errorDiv.text('')

  if (!selectedLat || !selectedLon) {
    errorDiv.text('Please select a city from the suggestions')
    return
  }

  try {
    const data = await fetchWeather(selectedLat, selectedLon)
    const { name, main, weather, wind } = data

    weatherDiv.html(`
      <div class="card mx-auto" style="max-width: 400px;">
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <p><strong>Temperature:</strong> ${main.temp}°C</p>
          <p><strong>Weather:</strong> ${weather[0].description}</p>
          <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
          <p><strong>Humidity:</strong> ${main.humidity}%</p>
          <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}" class="img-fluid">
        </div>
      </div>
    `)
  } catch (error) {
    errorDiv.text(error.message)
  }
})
