class ToyCard {

  static all = []
  static sort = "alphabetical"
  static filter = "all"
  static search = ""

  // DOM Manipulation with classes
  // > Store the data on the instance
  // > Store the div that it's rendering on the instance
  // > Build a method to rerender the card, taking in the data from the instance

  constructor(toy){
    this.toy = toy
    this.renderToy()
    this.constructor.all.push(this)
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
      <button class="donate-btn">Donate ${name}</button>
      `
  }

  update = (toy) => {
    this.toy = toy
    this.renderInnerHTML()
  }

  delete = () => {
    api.deleteToy(this.toy.id).then(response => {
      if(response.ok) {
        const index = this.constructor.all.indexOf(this)
        this.constructor.all.splice(index, 1)
        this.card.remove()
      }
    })
  }


  static getAll(){
    api.getAllToys().then(toys => toys.forEach(toy => new ToyCard(toy)))
  }

  static setEventListeners(){
    toyCollection.addEventListener("click", this.handleClick)
    document.getElementById("sort").addEventListener("change", this.handleSort)
    document.getElementById("filter").addEventListener("change", this.handleFilter)
    document.getElementById("search").addEventListener("keyup", this.handleSearchChange)
  }

  static handleSearchChange = (e)=> {
    this.search = e.target.value
    this.rerenderAll()
  }

  static handleClick = (e) => {
    const card = e.target.closest(".card")
    if (card){
      const id = card.dataset.id
      const toyCard = this.findById(id)
      if (e.target.classList.contains("like-btn")){
        api.likeToy(id).then(toy => toyCard.update(toy))
      }
      if (e.target.classList.contains("edit-btn")){
        toyFormInstance.renderEditToyForm(toyCard.toy)
      }
      if (e.target.classList.contains("donate-btn")){
        toyCard.delete()
      }
    }
  }

  static handleSort = (e) => {
    this.sort = e.target.value
    this.rerenderAll()
  }

  static handleFilter = (e) => {
    this.filter = e.target.value
    this.rerenderAll()
  }

  static findById(id){
    return this.all.find(toyCard => toyCard.toy.id === parseInt(id))
  }


  static filteredToyCards = () => {
    const searchedArray = [...this.all.filter(toyCard => toyCard.toy.name.toLowerCase().includes(this.search.toLowerCase()))]

    if (this.filter === "all"){
      return searchedArray
    }
    if (this.filter === "likes"){
      return searchedArray.filter(toyCard => toyCard.toy.likes > 5)
    }
  }

  static sortedAndFilteredToyCards = () => {
    if (this.sort === "alphabetical"){
      return this.filteredToyCards().sort((toyA, toyB) => toyA.toy.name.localeCompare(toyB.toy.name))
    }
    if (this.sort === "likes"){
      return this.filteredToyCards().sort((toyA, toyB) => toyB.toy.likes - toyA.toy.likes)
    }
  }

  static rerenderAll(){
    toyCollection.innerHTML = ""
    this.sortedAndFilteredToyCards().forEach(toyCard => toyCard.renderToy())
  }

}
