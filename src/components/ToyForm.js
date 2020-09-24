class ToyForm {

  constructor(){
    this.renderNewToyForm()
    this.addEventListeners()
    this.showForm = false
  }

  addEventListeners(){
    addBtn.addEventListener("click", () => {
      this.renderNewToyForm()
      this.toggleForm()
    });
    toyFormContainer.addEventListener("submit", this.handleSubmit)
  }


  handleSubmit = (e) => {
    e.preventDefault()
    const data = this.getDataFromForm(e.target)
    const id = e.target.dataset.id
    if (id){
      api.updateToy(id, data).then(toy => {
        ToyCard.findById(id).update(toy)
        this.renderNewToyForm()
        this.toggleForm()
      })
    }
    else {
      api.postToy(data).then(toy => new ToyCard(toy))
    }
  }

  getDataFromForm = (form) => {
    return {name: form.name.value, image: form.image.value}
  }

  toggleForm =() => {
    this.showForm = !this.showForm;
    if (this.showForm) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  }


  renderEditToyForm(toy){
    !this.showForm && this.toggleForm()
     toyFormContainer.innerHTML = `
     <form class="update-toy-form" data-id=${toy.id}>
     <h3>Update ${toy.name}!</h3>

     <input
       type="text"
       name="name"
       value="${toy.name}"
       placeholder="Enter a toy's name..."
       class="input-text"
     />
     <br />
     <input
       type="text"
       name="image"
       value="${toy.image}"
       placeholder="Enter a toy's image URL..."
       class="input-text"
     />
     <br />
     <input
       type="submit"
       name="submit"
       value="Update!"
       class="submit"
     />
   </form>
   `
  }

  renderNewToyForm(){
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
