const payBtn = document.querySelector(".btn-buy");

payBtn.addEventListener("click", () => {
    fetch("/stripe-checkout", {
        method: "POST",
        headers: new Headers({"Content-type": "application/json"}),
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem("cartItems")),
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        location.href = data.url;
        clearCart();
        updateCartIcon ();
    })
    .catch((err) => console.log(err));
});
