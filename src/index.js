let api = new Adapter("http://localhost:3000")
const toyFormContainer = document.querySelector(".container");
const toyForm = new ToyForm()
ToyCard.getToys()
document.getElementById("sort-select").addEventListener("change", ToyCard.handleSort)

document.getElementById("toy-collection").addEventListener("click", ToyCard.handleClick)
