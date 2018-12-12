
$("input[type='number']").InputSpinner({

    // button text/icons
    decrementButton: "<strong>-</strong>",
    incrementButton: "<strong>+</strong>",

    // class of input group
    groupClass: "input-group-spinner",

    // button class
    buttonsClass: "btn-outline-secondary",

    // button width
    buttonsWidth: "2.5em",

    // text alignment
    textAlign: "center",

    // delay in milliseconds
    autoDelay: 500,

    // interval in milliseconds
    autoInterval: 100,

    // boost after these steps
    boostThreshold: 15,

    // boost multiplier
    boostMultiplier: 2,

    // detects the local from `navigator.language`, if null
    locale: null

});