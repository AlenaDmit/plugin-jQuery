const data = {
    cities: ['Moscow', 'Ulan-Ude', 'Saint Petersburg', 'Kostroma', 'Samara', 'Vologda'],
    direction: 'up'
};

function getPlugin(cities, dist, direction) {
    const data = cities;
    const sss = cities;
    const ddd = dist;
    const token = "c6898c020dd0d3c6977019766daf9eca";
    const url_curr = "http://api.openweathermap.org/data/2.5/weather?q={HOLDER}&appid=" + token;

    const makeElement = (type='div', attributes={}, content='') => {
        let element = document.createElement(type);
        element.innerHTML = content;
        for (const key in attributes) {
            element.setAttribute(key, attributes[key])
        }
        return element;
    };

    const fragment = document.createDocumentFragment();
    const container = makeElement('div', {
        class: 'container'
    });
    const list = makeElement('ul', {
        class: 'list'
    });

    container.append(list);
    fragment.append(container);
    dist.append(fragment);
    $('body').append(dist);

    const getCityWeatherPromise = (city) => fetch(url_curr.replace("{HOLDER}", city), {
        method: 'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    });

    const renderOneElement = (elementDist) => (city) => {
        let item = makeElement('li', {
            class: 'list__item'
        });

        let itemName = makeElement('div', {
            class: 'list__item__item-name'
        }, city);

        let itemWeather = makeElement('div', {
            class: 'list__item__item-weather'
        });
        renderPromiseWeatherToList(city, itemWeather);
        item.append(itemName);
        item.append(itemWeather);
        elementDist.append(item);
    };

    function renderElements(data = sss, dist = list) {
        data.cities.forEach(renderOneElement(dist));
        const items = $('.list__item');
        items.click(function (e) {
            if (e.currentTarget.classList.contains('active-item')) return;
            items.removeClass('active-item');
            items.removeAttr('style');
            e.currentTarget.classList.add('active-item');
            // $(e.currentTarget).animate({
            //     width: "70%",         // ширина станет 70%
            //     opacity: 0.4,         // прозрачность будет 40%
            //     marginLeft: "0.6in",  // отступ от левого края элемента станет равным 6 дюймам
            //     fontSize: "3em",      // размер шрифта увеличится в 3 раза
            //     borderWidth: "10px"   // толщина рамки станет 10 пикселей
            // }, 1500);
        });
    }

    const renderPromiseWeatherToList = (cityName, dist) => {
        const weather = getCityWeatherPromise(cityName);
        weather.then(r => r.json()).then(renderWeatherToItem(dist));
    };

    const renderWeatherToItem = (dist) => (response) => {
        dist.innerHTML = Math.floor(response.main.temp) - 273 + "° now in this city"; // itemWeather
    };

    return {
        renderElements,
    };
}

$(document).ready(function () {
    const block = $('.block');
    const plugin = getPlugin(data, block);
    plugin.renderElements()
});