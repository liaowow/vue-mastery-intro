Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">

            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

            <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
            </p>
            
            <p>
            <label for="review">Review:</label>      
            <textarea id="review" v-model="review"></textarea>
            </p>
            
            <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
            </p>

            <p>Would you recommend it?</p>

            <label for="yes">
            Yes
            <input type="radio" id="yes" name="recomm" value="Yes" v-model="recommend">
            </label>
            
            <label for="no">
            No
            <input type="radio" id="no" name="recomm" value="No" v-model="recommend">
            </label>

            <p>
            <input type="submit" value="Submit">  
            </p>    
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {

            if (this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit("review-submitted", productReview)
    
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
              if (!this.name) this.errors.push("Name required.")
              if (!this.review) this.errors.push("Review required.")
              if (!this.rating) this.errors.push("Rating required.")
              if (!this.recommend) this.errors.push("Recommendation required.")
            }

        }
    }
})

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    <div class="product-image">
        <img :src="image">
    </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            
            <p v-if="inStock">In Stock</p>
            <!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p> -->
            <p v-else
            :class="{ outOfStock: !inStock }">Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>   
            <product-details :details="details"></product-details>
            <!-- <span v-show="onSale">ON SALE!!</span> -->
            <p>{{ displaySale }}</p>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)"
                >
            </div>

            <button v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }">Add to Cart</button>

            <button v-on:click="removeFromCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }">Remove from Cart</button>

            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>Review: {{ review.review }}</p>
                    <p>Recommend this product? {{ review.recommend }}</p>
                    </li>
                </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>

        </div>
    </div>
    `,
    data() {
        return {
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
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
        },
    
        removeFromCart() {
            this.$emit("remove-item", this.variants[this.selectedVariant].variantId)
        },
    
        updateProduct(index) {
            this.selectedVariant = index
            // console.log(index)
        },

        addReview(productReview) {
            this.reviews.push(productReview)
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }

})

var product = "Socks"

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for (let i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1)
                }
            }
        }
    }
})