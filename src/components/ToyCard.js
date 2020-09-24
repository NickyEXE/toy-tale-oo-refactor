class ToyCard {

  static all = []

  constructor(toy){
    this.toy = toy
    this.renderToy()
    this.constructor.all.push(this)
  }

  update = (toy) => {
    this.toy = toy
    this.renderInnerHTML()
  }

  renderToy(){
    const card = document.createElement("div")
    card.classList.add("card")
    this.card = card
    this.renderInnerHTML()
    toyCollection.appendChild(card)
  }

  renderInnerHTML(){
    const { name, image, likes, id } = this.toy
    this.card.dataset.id = id
    this.card.innerHTML = `
      <h2>${name}</h2>
      <img src=${image} class="toy-avatar" />
      <p>${likes} Likes </p>
      <button class="like-btn">Like <3</button>
      <button class="edit-btn">Edit ${name}</button>
      `
  }

  static getAll(){
    api.getAllToys().then(toys => toys.forEach(toy => new ToyCard(toy)))
  }

  static setEventListeners(){
    toyCollection.addEventListener("click", this.handleClick)
  }

  static handleClick = (e) => {
    if (e.target.classList.contains("like-btn")){
      const card = e.target.closest(".card")
      const id = card.dataset.id
      api.likeToy(id).then(toy => ToyCard.findById(id).update(toy))
    }
    if (e.target.classList.contains("edit-btn")){
      const card = e.target.closest(".card")
      const id = card.dataset.id
      const toyCard = this.findById(id)
      toyFormInstance.renderEditToyForm(toyCard.toy)
    }
  }

  static findById(id){
    return this.all.find(toyCard => toyCard.toy.id === parseInt(id))
  }

}
