class UI {
  constructor() {
    this.logList = document.querySelector("#log-list");
    this.techSelectOptions = document.querySelector("#tech-select-options");
    this.techList = document.querySelector("#tech-workers");
    this.id = document.querySelector("#id");
    this.message = document.querySelector("#message");
    this.firstName = document.querySelector("#first-name");
    this.lastName = document.querySelector("#last-name");
    this.attention = document.querySelector(".filled-in");
  }

  showLogs(logs) {
    let output = "";

    logs.forEach(log => {
      output += `
      <li class="collection-item center-align log">
      <div>
      <a
      href="#edit-add-log-modal" class="modal-trigger edit-log" data-id="${log.id}" style="color:${log.attention ? "red" : "blue"}">${log.message}</a>
      </br>
      <span class="grey-text">
          <span class="black-text">ID #${log.id}</span> last updated by
          <span class="black-text">${log.tech}</span> on 
          <span class="black-text">${log.date}</span>
          <span style="display:none;" >${log.attention}</span>
        </span>
        <a href="#!" class=" secondary-content delete-log" data-id="${log.id}">
        <i class="material-icons grey-text">delete</i>
      </a>
      </div>
      </li>`;
    });
    this.logList.innerHTML = output;
  }

  showTechs(techs) {
    let output = "";

    techs.forEach(tech => {
      output += `
      <option value="${tech.firstName} ${tech.lastName}">
      ${tech.firstName} ${tech.lastName}</option>
      `;
    });
    this.techSelectOptions.innerHTML = output;
  }

  showList(techs) {
    let output = "";

    techs.forEach(tech => {
      output += `
     <div class="col s12">
      ${tech.firstName} ${tech.lastName}
       <a href="#!" class="secondary-content delete-tech" data-id="${tech.id}">
          <i class="material-icons grey-text">delete</i>
        </a>
        <div class="divider"></div>
      </div>
     `;
    });
    this.techList.innerHTML = output;
  }

  clearLog() {
    this.message.value = "";
  }

  showCancelButton() {
    //Create button
    const button = document.createElement("button");
    button.appendChild(document.createTextNode("Cancel"));
    button.className = "modal-close waves-effect teal lighten-2 btn cancel-log";

    //Introduce parent element
    const footer = document.querySelector(".quit-edit");
    const enterButton = document.querySelector(".add-log");
    footer.insertBefore(button, enterButton);
  }

  removeCancelButton() {
    const button = document.querySelector(".cancel-log");
    if (button) {
      setTimeout(() => button.remove(), 0)
    }
  }

  clearEdit() {
    this.id.value = "";
    this.message.value = "";
    this.techSelectOptions.selectedIndex = "0";
    this.attention.checked = false
  }

  clearTech() {
    this.firstName.value = "";
    this.lastName.value = "";
  }
}

export const ui = new UI();
