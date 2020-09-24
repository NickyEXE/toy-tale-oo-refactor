class Adapter {
  constructor(url){
    this.url = url
  }

  getToys = () => fetch(`${this.url}/toys`).then(res => res.json())

  likeToy = (id) => fetch(`${this.url}/toys/${id}`, {method: "PATCH"}).then(res => res.json())

  submitToy = (data) => {
    return fetch(`${this.url}/toys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
  }

  editToy = (id, data) => {
    return fetch(`${this.url}/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
  }

  deleteToy = (id) => fetch(`${this.url}/toys/${id}`, {method: 'DELETE'})

}
