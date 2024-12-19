const apiKey = '7b6bf70b202594fbe39622cca9120de7'

let selectedLat: number | null = null
let selectedLon: number | null = null

interface CitySuggestionResponse {
  name: string
  country: string
  lat: number
  lon: number
}

interface WeatherResponse {
  name: string
  main: {
    temp: number
    humidity: number
  }
  weather: {
    description: string
    icon: string
  }[]
  wind: {
    speed: number
  }
}

async function fetchSuggestions(
  query: string
): Promise<CitySuggestionResponse[]> {
  if (!query) return []

  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
  )

  return response.json()
}

async function fetchWeather(
  lat: number,
  lon: number
): Promise<WeatherResponse> {
  if (!lat || !lon) throw new Error('Coordinates must be provided')

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )

  if (!response.ok) throw new Error('City not found')

  return response.json()
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), delay)
  }
}

document.querySelector('.city')?.addEventListener(
  'input',
  debounce(async (event: Event) => {
    const target = event.target as HTMLInputElement
    const query = target.value.trim()
    const cities = await fetchSuggestions(query)

    const suggestions = document.querySelector('.suggestions') as HTMLElement
    suggestions.innerHTML = `
      <ul class="list-group">
        ${cities
          .map(
            (city) =>
              `<li class="list-group-item" data-lat="${city.lat}" data-lon="${city.lon}">${city.name}, ${city.country}</li>`
          )
          .join('')}
      </ul>
    `

    document.querySelectorAll('.list-group-item').forEach((item) =>
      item.addEventListener('click', function () {
        const city = item.textContent
        selectedLat = Number(item.getAttribute('data-lat'))
        selectedLon = Number(item.getAttribute('data-lon'))

        const cityInput = document.querySelector('.city') as HTMLInputElement
        cityInput.value = city ?? ''
        suggestions.innerHTML = ''
      })
    )
  }, 500)
)

document.querySelector('.search')?.addEventListener('click', async () => {
  const weatherDiv = document.querySelector('.weather') as HTMLElement
  const errorDiv = document.querySelector('.error') as HTMLElement
  weatherDiv.innerHTML = ''
  errorDiv.textContent = ''

  if (!selectedLat || !selectedLon) {
    errorDiv.textContent = 'Please select a city from the suggestions'
    return
  }

  try {
    const data = await fetchWeather(selectedLat, selectedLon)
    const { name, main, weather, wind } = data

    weatherDiv.innerHTML = `
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
    `
  } catch (error) {
    errorDiv.textContent =
      error instanceof Error ? error.message : 'An error occurred'
  }
})
