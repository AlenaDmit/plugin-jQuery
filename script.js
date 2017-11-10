const data = {
    cities: ['Moscow', 'Ulan-Ude', 'Saint Petersburg', 'Kostroma', 'Samara', 'Vologda'],
    direction: 'up'
};

const getPlugin = (data, dist) => {
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

    container.appendChild(list);
    fragment.appendChild(container);
    dist.appendChild(fragment);
    document.body.appendChild(dist);

    const getListItem = (() => {
        for (let i = 0; i < data.cities.length; i++) {
            let item = makeElement('li', {
                class: 'list__item'
            }, data.cities[i]);
            list.appendChild(item);
        }
    })();
};

window.onload = function () {
    const block = document.querySelector('.block');
    getPlugin(data, block);
};