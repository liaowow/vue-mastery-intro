var product = "Socks"

var app = new Vue({
    el: '#app',
    data: {
        brand: "Vue Mastery",
        product: "Socks",
        selectedVariant: 0,
        // image: './assets/vmSocks-green.jpg',
        // inventory: 100,
        // inStock: true,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: './assets/vmSocks-green.jpg',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './assets/vmSocks-blue.jpg',
                variantQuantity: 0
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

        updateProduct: function(index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        displaySale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }

            return this.title()
        }
    }
})