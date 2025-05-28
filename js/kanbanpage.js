"use strict";
const pendig = document.querySelector('kanban-pending')
const enproceso = document.querySelector('kanban-inprogress')
const completados = document.querySelector('kanban-completed')

class kanbanpendig extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._tareasPending = [];
      this.tereas = []
    }
    set _tareasPending(value){
      this.tereas = value
      this.render()
    }
    render(){
      this.estilos = document.createElement('style');
      this.estilos.innerHTML= /*css*/`
      .tarjetapending{
          margin: 3.8rem;
          width: 200px;
          padding: 1rem;
          border-radius: 1rem;
          background-color: var(--rojo-titulos);
          color: white;
          text-shadow: 1px 1px black;
      }`
      this.shadowRoot.appendChild(this.estilos);
      this.tereas.forEach(usuario => {
          usuario.tareas.forEach(tarea => {
              if (tarea.estado == "pendiente") {
                  this.pagina = document.createElement('div');
                  this.pagina.classList.add("tarjetapending");
                  this.pagina.innerHTML = /*html*/`
                      <div class="tarjeta">
                          <p>${tarea.titulo}</p>
                          <p>${tarea.descripcion}</p>
                          <p>${tarea.fechai.dia}/${tarea.fechai.mes}/${tarea.fechai.año}</p>
                          <p>${tarea.fechaf.dia}/${tarea.fechaf.mes}/${tarea.fechaf.año}</p>
                      </div>`
                  this.shadowRoot.appendChild(this.pagina);
              }
          });
          
      });
      
    }
}
class kanbaninprogress extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._tareasPending = [];
      this.tereas = []
    }
    set _tareasPending(value){
      this.tereas = value
      this.render()
    }
    render(){
      this.estilos = document.createElement('style');
      this.estilos.innerHTML= /*css*/`
      .tarjetainprogress{
          margin: 3.8rem;
          width: 200px;
          padding: 1rem;
          border-radius: 1rem;
          background-color: var(--azul-inprogress);
          color: white;
          text-shadow: 1px 1px black;
      }`
      this.shadowRoot.appendChild(this.estilos);
      this.tereas.forEach(usuario => {
          usuario.tareas.forEach(tarea => {
              if (tarea.estado == "en proceso") {
                  this.pagina = document.createElement('div');
                  this.pagina.classList.add("tarjetainprogress");
                  this.pagina.innerHTML = /*html*/`
                      <div class="tarjeta">
                          <p>${tarea.titulo}</p>
                          <p>${tarea.descripcion}</p>
                          <p>${tarea.fechai.dia}/${tarea.fechai.mes}/${tarea.fechai.año}</p>
                          <p>${tarea.fechaf.dia}/${tarea.fechaf.mes}/${tarea.fechaf.año}</p>
                      </div>`
                  this.shadowRoot.appendChild(this.pagina);
              }
          });
          
      });
      
    }
}
class kanbancompleted extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._tareasPending = [];
      this.tereas = []
    }
    set _tareasPending(value){
      this.tereas = value
      this.render()
    }
    render(){
      this.estilos = document.createElement('style');
      this.estilos.innerHTML= /*css*/`
      .tarjetacompleted{
          margin: 3.8rem;
          width: 200px;
          padding: 1rem;
          border-radius: 1rem;
          background-color: var(--verde-completadas);
          color: white;
          text-shadow: 1px 1px black;
      }`
      this.shadowRoot.appendChild(this.estilos);
      this.tereas.forEach(usuario => {
          usuario.tareas.forEach(tarea => {
              if (tarea.estado == "completada") {
                  this.pagina = document.createElement('div');
                  this.pagina.classList.add("tarjetacompleted");
                  this.pagina.innerHTML = /*html*/`
                      <div class="tarjeta">
                          <p>${tarea.titulo}</p>
                          <p>${tarea.descripcion}</p>
                          <p>${tarea.fechai.dia}/${tarea.fechai.mes}/${tarea.fechai.año}</p>
                          <p>${tarea.fechaf.dia}/${tarea.fechaf.mes}/${tarea.fechaf.año}</p>
                      </div>`
                  this.shadowRoot.appendChild(this.pagina);
              }
          });
          
      });
      
    }
  }
const llenartareas = () =>{
    fetch('http://localhost:3000/usuarios', {})
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
        pendig._tareasPending = data
        enproceso._tareasPending = data
        completados._tareasPending = data
    })
    .catch(error => console.error('Error:', error));
}
customElements.define('kanban-pending',kanbanpendig)
customElements.define('kanban-inprogress',kanbaninprogress)
customElements.define('kanban-completed',kanbancompleted)
llenartareas()

