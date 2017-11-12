const data = {
    cities: ['Moscow', 'Ulan-Ude', 'Saint Petersburg', 'Kostroma', 'Samara', 'Vologda'],
    direction: 'up'
};

const getPlugin = (data, dist) => {
    const token = "c6898c020dd0d3c6977019766daf9eca";
    const url_curr = "http://api.openweathermap.org/data/2.5/weather?q={HOLDER}&appid=" + token;

    const makeElement = (type='div', attributes={}, content='') => {
        let element = document.createElement(type);
        element.innerHTML = content;
        for (key in attributes) {
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

    const getListItem = (() => {
        for (let i = 0; i < data.cities.length; i++) {
            let item = makeElement('li', {
                class: 'list__item'
            });

            let itemName = makeElement('div', {
                class: 'list__item__item-name'
            }, data.cities[i]);

            let itemWeather = makeElement('div', {
                class: 'list__item__item-weather'
            });

            const url = url_curr.replace("{HOLDER}", data.cities[i]);

            fetch(url)
                .then(res => res.json())
                .then(res => itemWeather.innerHTML = Math.floor(res.main.temp) - 273 + "° now in this city")
                .catch(e => console.log(e));

            item.append(itemName);
            item.append(itemWeather);
            list.append(item);
        }
    })();
};

$(document).ready(function () {
    const block = $('.block');
    getPlugin(data, block);
});