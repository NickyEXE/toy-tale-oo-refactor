class ToyCard {

  static all = []
  static filter = "alphabetical"

  constructor(toy){
    this.toy = toy
    this.constructor.all.push(this)
  }

  renderWholeCard(){
    this.card = this.createCard()
    console.log("rendering")
    this.renderInnerHTML()
  }

  createCard(){
    const card = document.createElement("div")
    card.classList.add("card")
    card.dataset.id = this.toy.id
    document.getElementById("toy-collection").appendChild(card)
    return card
  }

  updateToy(toyData){
    this.toy = toyData
    this.renderInnerHTML()
  }

  like(){
    api.likeToy(this.toy.id).then((toy) => {
      this.updateToy(toy)
    })
  }

  edit(){
    toyForm.renderEditForm(this.toy)
  }

  delete(){
    api.deleteToy(this.toy.id)
    this.card.remove()
    const index = this.constructor.all.indexOf(this)
    this.constructor.all.splice(index, 1)
  }

  renderInnerHTML(){
    const {name, image, likes} = this.toy
    this.card.innerHTML = `
      <h2>${name}</h2>
      <img src=${image} class="toy-avatar" />
      <p>${likes} Likes </p>
      <button class="like-btn">Like <3</button>
      <button class="edit-btn">Edit ${name}</button>
      <button class="delete-btn">Delete ${name}</button>
      `
  }

  static getToys(){
    api.getToys().then(toys => {
      toys.forEach(toy => new ToyCard(toy))
      this.renderAllCards()
    })
  }

  static findToyCardById(id){
    return this.all.find(toyCard => toyCard.toy.id === parseInt(id))
  }

  static handleClick = (e) => {
    const card = e.target.closest(".card")
    if (card){
      const id = card.dataset.id
      const toyCard = this.findToyCardById(id)
      if (e.target.classList.contains("like-btn")){
        toyCard.like()
      }
      if (e.target.classList.contains("edit-btn")){
        toyCard.edit()
      }
      if (e.target.classList.contains("delete-btn")){
        toyCard.delete()
      }
    }
  }

  static filteredCards(){
    if (this.filter === "alphabetical"){return [...this.all].sort((itemA, itemB) => itemA.toy.name.localeCompare(itemB.toy.name))}
    if (this.filter === "likes"){return [...this.all].sort((itemA, itemB) => itemA.toy.likes - itemB.toy.likes)}
  }

  static handleSort = (e) => {
    this.filter = e.target.value
    console.log(this.filter)
    this.renderAllCards()
  }

  static renderAllCards(){
    document.getElementById("toy-collection").innerHTML = ""
    console.log("calling", this.all)
    this.filteredCards().forEach(item => item.renderWholeCard())
  }

}
