class ToyForm {

  constructor(){
    this.addToy = false
    this.renderForm()
    this.setEventListeners()
  }

  getDataFromForm = () => {
    const form = toyFormContainer.querySelector("form")
    return {
      name: form.name.value,
      image: form.image.value
    }
  }

  setEventListeners(){
    const addBtn = document.querySelector("#new-toy-btn");
    addBtn.addEventListener("click", this.toggleForm);
    toyFormContainer.addEventListener("submit", this.handleSubmit)
  }

  toggleForm = () => {
    this.addToy = !this.addToy;
    this.renderForm()
      if (this.addToy) {
        toyFormContainer.style.display = "block";
      }
      else {
        toyFormContainer.style.display = "none";
      }
  }

  submitToy(data){
    api.submitToy(data).then(toy => {
      if (toy.id){
        new ToyCard(toy)
      }
      else {alert("Error!")}
    })
  }

  editToy(id, data){
    api.editToy(id, data).then(toy => {
      const toyCard = ToyCard.findToyCardById(toy.id)
      toyCard.updateToy(toy)
      this.renderForm()
      this.toggleForm()
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const data = this.getDataFromForm()
    // this.submitToy(data)
    if (e.target.dataset.id) {
      this.editToy(e.target.dataset.id, data)
    }
    else {
      this.submitToy(data)
    }
    console.log(e.target)
  }

  renderEditForm(toy){
    !this.addToy && this.toggleForm()
    const {name, image, id} = toy
    toyFormContainer.innerHTML = `
      <form class="edit-toy-form" data-id=${id}>
      <h3>Edit ${name}!</h3>

      <input
        type="text"
        name="name"
        value="${name}"
        placeholder="Enter a toy's name..."
        class="input-text"
      />
      <br />
      <input
        type="text"
        name="image"
        value="${image}"
        placeholder="Enter a toy's image URL..."
        class="input-text"
      />
      <br />
      <input
        type="submit"
        name="submit"
        value="Submit Edits!"
        class="submit"
      />
    </form>
    `
  }

  renderForm(){
    toyFormContainer.innerHTML = `
      <form class="add-toy-form">
      <h3>Create a toy!</h3>

      <input
        type="text"
        name="name"
        value=""
        placeholder="Enter a toy's name..."
        class="input-text"
      />
      <br />
      <input
        type="text"
        name="image"
        value=""
        placeholder="Enter a toy's image URL..."
        class="input-text"
      />
      <br />
      <input
        type="submit"
        name="submit"
        value="Create New Toy"
        class="submit"
      />
    </form>
    `
  }

}
