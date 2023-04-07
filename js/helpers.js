export const Helpers = {

    async getWeatherbyCoords({ lat, lon }) {
        let data;

        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=817ee402db4510ccfef28a1daa72266d&units=metric`);
            data = await response.json();

            if (!response.ok) {
                throw new Error(`${data.error}: ${data.message}`);
            }

        } catch (error) {
            console.log(error);
        }

        return data;

    }, 

    async getCoordsbyCity(city) {
        let data;
        let coords;

        try {
            let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=817ee402db4510ccfef28a1daa72266d`);
            data = await response.json();

            if (!response.ok) {
                throw new Error(`${data.error}: ${data.message}`);
            }

        } catch (error) {
            console.log(error);
        }

        coords = {
            lat: data[0].lat,
            lon: data[0].lon
        }

        return coords;
    },

    async getCitybyCoords({ lat, lon }) {
        let data;
        let city;

        try {
            let response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=817ee402db4510ccfef28a1daa72266d`);
            data = await response.json();

            if (!response.ok) {
                throw new Error(`${data.error}: ${data.message}`);
            }

        } catch (error) {
            console.log(error);
        }

        city = data[0].name;

       return city;
    }, 

    async showWeatherStart(city, dropdown) {
        Array.from(dropdown.options).map((option) => {
            if (option.text === city) {
                option.setAttribute('selected', 'selected');
            } else {
                dropdown.options[0].setAttribute('selected', 'selected');
            }
        })
    },

    getTimeDate() {
        const currentDate = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[currentDate.getMonth()];
        const date = currentDate.getDate();
        const hours24 = currentDate.getHours();
        const format = hours24 >= 12 ? 'pm' : 'am';
        const hours = hours24 % 12 || 12; 
        const mins = currentDate.getMinutes();

        const timeDate = `${hours}:${mins} ${format}, ${month} ${date}`;

        return timeDate;
    }

}

export const { getWeatherbyCoords, getCoordsbyCity, getCitybyCoords, showWeatherStart, getTimeDate } = Helpers;