class ApiService {

  constructor(root){
    this.root = root
  }

  getAllToys = () => fetch(`${this.root}/toys`).then(res => res.json())

  postToy = (toy) => {
    return fetch(`${this.root}/toys`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toy),
    })
    .then(res => res.json())
  }

  updateToy = (id, toy) => {
    return fetch(`${this.root}/toys/${id}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toy),
    })
    .then(res => res.json())
  }

  likeToy = (id) => fetch(`${this.root}/toys/${id}`, {method: "PATCH"}).then(res => res.json())

}
