var product = "Socks"

var app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: './assets/vmSocks-green.jpg',
        inventory: 8,
        onSale: false,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: './assets/vmSocks-green.jpg'         
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './assets/vmSocks-blue.jpg'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function() {
            this.cart += 1
        },

        remove1FromCart: function() {
            this.cart -= 1
        },

        updateProduct: function(variantImage) {
            this.image = variantImage
        }
    }
})