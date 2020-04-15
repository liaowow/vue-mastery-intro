## Notes

### v-bind
Dynamically binds an attribute to an expression.

### v-show
Dynamically displays/hides DOM element based on boolean value.

### v-for
Loops over the array and displays each element inside the array.

### v-on
Event Listener. (Short-hand version: @)

### Computed Properties
Acting as a calculator, computed properties are cached, meaning the results are saved until the dependencies change. It makes the operation more perfomant than a method, which can be more expensive in terms of operation (we don't want to re-run whenever we access it)

### mounted()
A Lifecycle hook that gets mounted as soon as the component is mounted to the DOM