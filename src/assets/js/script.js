$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})


feather.replace()

$(document).ready(function() {

    // Smart Wizard
    $('#smartwizard').smartWizard({
        selected: 0, // Initial selected step, 0 = first step 
        keyNavigation: true, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
        autoAdjustHeight: true, // Automatically adjust content height
        cycleSteps: false, // Allows to cycle the navigation of steps
        backButtonSupport: true, // Enable the back button support
        useURLhash: false, // Enable selection of the step based on url hash
        showStepURLhash: false,
        lang: { // Language variables
            next: 'Next',
            previous: 'Previous'
        },
        anchorSettings: {
            anchorClickable: true, // Enable/Disable anchor navigation
            enableAllAnchors: true, // Activates all anchors clickable all times
            markDoneStep: true, // add done css
            enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation
        },
    });

    $('#smartwizard1').smartWizard({
        selected: 0, // Initial selected step, 0 = first step 
        keyNavigation: true, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
        autoAdjustHeight: true, // Automatically adjust content height
        cycleSteps: false, // Allows to cycle the navigation of steps
        backButtonSupport: true, // Enable the back button support
        useURLhash: false, // Enable selection of the step based on url hash
        showStepURLhash: false,
        lang: { // Language variables
            next: 'Next',
            previous: 'Previous'
        },
        anchorSettings: {
            anchorClickable: true, // Enable/Disable anchor navigation
            enableAllAnchors: true, // Activates all anchors clickable all times
            markDoneStep: true, // add done css
            enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation
        },
    });

});


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


//profile image upload preview
function readURL(input, preview) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#' + preview + '_image_preview').css("background-image", "url(" + e.target.result + ")");
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#prev_img_upload_btn").change(function() {
    readURL(this, 'prev');
});

$("#other_img_upload_btn").change(function() {
    readURL(this, 'other');
});

$("#other2_img_upload_btn").change(function() {
    readURL(this, 'other2');
});

$("#other3_img_upload_btn").change(function() {
    readURL(this, 'other3');
});
$("#other4_img_upload_btn").change(function() {
    readURL(this, 'other4');
});