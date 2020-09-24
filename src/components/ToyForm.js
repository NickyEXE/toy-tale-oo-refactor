class ToyForm {

  constructor(){
    this.renderNewToyForm()
    this.addEventListeners()
    this.showForm = false
  }

  addEventListeners(){
    addBtn.addEventListener("click", this.toggleForm);
    toyFormContainer.addEventListener("submit", this.handleSubmit)
  }


  handleSubmit = (e) => {
    e.preventDefault()
    const data = this.getDataFromForm(e.target)
    api.postToy(data).then(toy => new ToyCard(toy))
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


  renderNewToyForm(){
    console.log("hello")
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
