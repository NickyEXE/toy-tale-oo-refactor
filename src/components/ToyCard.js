class ToyCard {

  constructor(toy){
    this.toy = toy
    this.renderToy()
  }

  renderToy(){
    const card = document.createElement("div")
    card.classList.add("card")
    this.card = card
    this.renderInnerHTML()
    toyCollection.appendChild(card)
  }

  renderInnerHTML(){
    const { name, image, likes } = this.toy
    this.card.innerHTML = `
      <h2>${name}</h2>
      <img src=${image} class="toy-avatar" />
      <p>${likes} Likes </p>
      <button class="like-btn">Like <3</button>
      `
  }

  static getAll(){
    api.getAllToys().then(toys => toys.forEach(toy => new ToyCard(toy)))
  }
}
