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
let search_button = document.querySelector('.searchBtn');

//values
let color = document.querySelector('.colorFilter');
let brand = document.querySelector('.brandFilter');
let size = document.querySelector('.sizeFilter');

//data variables
let Data;

//add shoe
let add_shoe = document.querySelector('.addBtn');
let brand_input = document.querySelector('.brandInput');
let color_input = document.querySelector('.colorInput');
let size_input = document.querySelector('.sizeInput');
let price_input = document.querySelector('.priceInput')
let qty_input = document.querySelector('.qtyInput');





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
//https://shoeapi-webapp.herokuapp.com/api/shoes

search_button.addEventListener('click', function () {
    // if (brand.value !== 'brandFilter' && size.value !== 'sizeFilter') {
    //     axios.get('/api/shoes/brand/' + brand.value + '/size/' + size.value)
    //         .then(function (response) {
    //             let results = response.data;
    //             Data = results.data;
    //             Data.forEach(element => {
    //             });
    //             render_all_results();
    //         })

    // } if (color.value === 'colorFilter' && brand.value === 'brandFilter' && size.value === 'sizeFilter') {
    axios.get('/api/shoes')
        .then(function (response) {
            let results = response.data;
            Data = results.data;
            render_all_results();
        })
    // }
    // if (brand.value !== 'brandFilter') {
    //     axios.get('/api/shoes/brand/' + brand.value)
    //         .then(function (response) {
    //             let results = response.data;
    //             Data = results.data;
    //             Data.forEach(element => {
    //             });
    //             render_all_results();
    //         })
    // }
    // if (size.value) {
    //     axios('/api/shoes/size/' + size.value)
    //         .then(function (response) {
    //             let results = response.data;
    //             Data = results.data
    //             Data.forEach(element => {
    //             });
    //             render_all_results();
    //         })
    // }


})



async function make_post_request() {
    let brand = brand_input.value;
    let color = color_input.value;
    let size = Number(size_input.value);
    let price = Number(price_input.value);
    let qty = Number(qty_input.value);

    let params = {
        brand: brand,
        color: color,
        size: size,
        price: price,
        qty: qty
    }

    await axios.post('/api/add/shoe/', params)
}


add_shoe.addEventListener('click', function () {
    make_post_request();
})

const render_all_results = () => {
    let display_html = shoes_list_compiled({ results: Data });
    shoes_data.innerHTML = display_html;

    const add = document.querySelectorAll('.add');
    add.forEach(element => {
        element.addEventListener('click', function () {
            async function send_id() {
                let id = Number(element.value)
                console.log(id);
                let params = {
                    id: id
                }

                await axios.post('/api/shoes/cart', params)

            }
            send_id();
        })

    });
}

//jquery
$(document).ready(function () {
    $('.ui.dropdown').dropdown();

    setTimeout(function () {
        $('#dimm').hide();
    }, 1000)

    $(document).ready(function () {
        $('.ui.accordion').accordion();
    });
});

$(document).ready(function () {
    axios.get('/api/dropdown/brand')
        .then(function (response) {
            var new_results;
            let results = response.data;
            let content = results.data;
            for (let x = 0; x < content.length; x++) {
                new_results = content[x].brand;
            }
            $('.ui.search')
                .search({
                    minCharacters: 3,
                    apiSettings: {
                        url: 'https://api.github.com/users'
                    },
                    type: 'standard',
                    source: new_results,
                    searchFields: ['brand'],
                });
            // console.log();


        })
});
//


document.addEventListener('DOMContentLoaded', function () {
    render_size_dropdown();
    render_brand_dropdown();
    render_color_dropdown();
})



