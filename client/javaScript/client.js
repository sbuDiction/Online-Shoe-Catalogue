//color dropdown
let template_one = document.querySelector('.template_color').innerHTML;
let color_compiled_template = Handlebars.compile(template_one);
let color_template_data = document.querySelector('.color_template');
//

//size dropdown
let template_two = document.querySelector('.sizeTemplate').innerHTML;
let size_compiled_template = Handlebars.compile(template_two);
let size_template_data = document.querySelector('.sizeData');
//

//brand dropdown
let template_three = document.querySelector('.brandTemplate').innerHTML
let brand_compiled_template = Handlebars.compile(template_three);
let brand_template_data = document.querySelector('.brandData');

//show all shoes
let template_fourth = document.querySelector('.shoesTemplate').innerHTML;
let shoes_list_compiled = Handlebars.compile(template_fourth);
let shoes_data = document.querySelector('.shoeData');
let search_button = document.querySelector('.searchBtn')


const render_color_dropdown = () => {
    axios.get('/api/dropdown/color')
        .then(function (response) {
            let results = response.data;
            let data = results.data;
            let display_html = color_compiled_template({ color: data });
            color_template_data.innerHTML = display_html;
        })
        .catch(function (response) {
            console.log('We have an arror in the color dropdown api');
        })
}

const render_size_dropdown = () => {
    axios.get('/api/dropdown/size')
        .then(function (response) {
            let results = response.data;
            let data = results.data;
            let display_html = size_compiled_template({ sizes: data })
            size_template_data.innerHTML = display_html;
        })
        .catch(function (response) {
            console.log('We have an arror in the size dropdown api');
        })
}

const render_brand_dropdown = () => {
    axios.get('/api/dropdown/brand')
        .then(function (response) {
            let results = response.data;
            let data = results.data;
            let display_html = brand_compiled_template({ brand: data });
            brand_template_data.innerHTML = display_html;
        })
        .catch(function (response) {
            console.log('We have an arror in the brand dropdown api');
        })
}

search_button.addEventListener('click', function () {
    axios.get('https://shoeapi-webapp.herokuapp.com/api/shoes')
        .then(function (response) {
            let results = response.data;
            let data = results.data;
            console.log(data);

            let display_html = shoes_list_compiled({ results: data });
            shoes_data.innerHTML = display_html;
        })
})



$(document).ready(function () {
    axios.get('/api/dropdown/brand')
        .then(function (response) {
            var new_results;
            let results = response.data;
            let content = results.data;
            console.log(content);
            for (let x = 0; x < content.length; x++) {
                new_results = content[x].brand;
                console.log(new_results, 'brand');
            }
            $('.ui.search')
                .search({
                    minCharacters: 1,
                    apiSettings: {
                        url: 'https://api.github.com/search/repositories?q={query}'
                    },
                    type: 'standard',
                    source: new_results,
                    searchFields: ['brand'],
                });
        })
});



$(document).ready(function () {
    $('.ui.dropdown').dropdown();
});

document.addEventListener('DOMContentLoaded', function () {
    render_color_dropdown();
    render_size_dropdown();
    render_brand_dropdown();
})

