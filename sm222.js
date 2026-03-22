console.log("Shopping Store lodded");
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function() {
        console.log("Store link clicked: ", button.href);
    });
});