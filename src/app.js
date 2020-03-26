import { ui } from "./ui";
import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";

//Init floating action button
$(document).ready(function() {
  $(".fixed-action-btn").floatingActionButton();
});

//Init modals
$(document).ready(function() {
  $(".modal").modal();
  $(".trigger-modal").modal();
});

//Get logs on DOM load

const getLogs = () => {
  axios
    .get("http://localhost:5000/logs")
    .then(response => ui.showLogs(response.data))
    .catch(err => console.log(err));

  axios
    .get("http://localhost:5000/techs")
    .then(response => ui.showTechs(response.data))
    .catch(err => console.log(err));
};

document.addEventListener("DOMContentLoaded", getLogs);

//Add log

const addLog = () => {
  //Opens up log modal
};
document.querySelector(".new-log").addEventListener("click", addLog);

//Add tech

const addTech = () => {
  //Opens tech modal
};
document.querySelector(".new-tech").addEventListener("click", addTech);

//Submit new tech

const submitTech = () => {
  const firstName = document.querySelector("#first-name").value;
  const lastName = document.querySelector("#last-name").value;

  const newTech = {
    firstName: firstName,
    lastName: lastName
  };

  axios
    .post("http://localhost:5000/techs", newTech)
    .then(response => {
      getLogs();
      ui.clearTech();
    })
    .catch(err => console.log(err));
};

document.querySelector(".add-new-tech").addEventListener("click", submitTech);

//Show list of technicians

const showTechList = () => {
  axios
    .get("http://localhost:5000/techs")
    .then(response => ui.showList(response.data))
    .catch(err => console.log(err));
};

document
  .querySelector(".tech-collection")
  .addEventListener("click", showTechList);

//Delete technician

const deleteTech = e => {
  if (e.target.parentElement.classList.contains("delete-tech")) {
    const id = e.target.parentElement.dataset.id;

    e.target.parentElement.parentElement.remove();
    axios.delete(`http://localhost:5000/techs/${id}`).then(response => {
      getLogs();
    });
    e.preventDefault();
  }
};

document.body.addEventListener("click", deleteTech);

//Edit log

const setSelectedTechnician = selectedTechnician => {
  const techincianOptions = $("#tech-select-options option");
  for (let idx = 0; idx < techincianOptions.length; idx++) {
    const currentOption = techincianOptions[idx];
    if (currentOption.value === selectedTechnician) {
      currentOption.selected = true;
    } else {
      currentOption.selected = false;
    }
  }
};

const editLog = e => {
  if (e.target.classList.contains("edit-log")) {
    e.preventDefault();
    ui.showCancelButton();

    const id = e.target.dataset.id;
    const message = e.target.textContent;
    const tech =
      e.target.nextElementSibling.nextElementSibling.children[1].textContent;
    const attention =
      e.target.nextElementSibling.nextElementSibling.children[3].innerHTML;

    //Get log

    const logData = {
      id: id,
      message: message,
      tech: tech,
      attention: attention
    };

    //Get modal input values

    const logID = document.querySelector("#id");
    const logMessage = document.querySelector("#message");
    const logAttention = document.querySelector(".filled-in");

    logID.value = logData.id;
    logMessage.value = logData.message;
    setSelectedTechnician(logData.tech);
    logAttention.value = logData.attention;
    if (attention === "false") {
      $("input.filled-in")[0].checked = false;
    } else {
      $("input.filled-in")[0].checked = true;
    }
  }
};

document.body.addEventListener("click", editLog);

const cancelEdit = e => {
  if (e.target.parentElement.classList.contains("quit-edit")) {
    ui.clearEdit();
    ui.removeCancelButton();
    e.preventDefault();
  }
};

document.body.addEventListener("click", cancelEdit);

//Submit log

const submitLog = () => {
  const idInputValue = document.querySelector("#id").value;

  if (idInputValue === "") {
    //ADD LOG

    //Get message
    const message = document.querySelector("#message").value;

    //Get selected option
    const e = document.querySelector("#tech-select-options");
    const tech = e.options[e.selectedIndex].text;

    //Get checkbox value
    const attention = document.querySelector(".filled-in").checked;

    //Get date
    const date = new Date();

    const newLog = {
      message: message,
      tech: tech,
      attention,
      date: date
    };

    axios
      .post("http://localhost:5000/logs", newLog)
      .then(response => {
        getLogs();
        ui.clearLog();
      })
      .catch(err => console.log(err));
  } else {
    //UPDATE LOG

    //Get id
    const id = document.querySelector("#id").value;

    //Get message
    const message = document.querySelector("#message").value;

    //Get selected option
    const e = document.querySelector("#tech-select-options");
    const tech = e.options[e.selectedIndex].text;

    //Get attention
    const attention = document.querySelector(".filled-in").checked;

    //Get date
    const date = new Date();

    const updLog = {
      id: id,
      message: message,
      tech: tech,
      attention,
      date: date
    };

    axios
      .put(`http://localhost:5000/logs/${id}`, updLog)
      .then(response => {
        getLogs();
        ui.clearEdit();
        ui.removeCancelButton();
      })
      .catch(err => console.log(err));
  }
};

document.querySelector(".add-log").addEventListener("click", submitLog);

//Delete log

const deleteLog = e => {
  if (e.target.parentElement.classList.contains("delete-log")) {
    e.preventDefault();
    const id = e.target.parentElement.dataset.id;

    e.target.parentElement.parentElement.parentElement.remove();
    axios
      .delete(`http://localhost:5000/logs/${id}`)
      .then(response => getLogs());
  }
};

document.body.addEventListener("click", deleteLog);

//Filter logs

const filterLogs = e => {
  //Get input
  const text = e.target.value.toLowerCase();

  //Get logs
  document.querySelectorAll(".log").forEach(log => {
    const logMessage = log.children[0].children[0].textContent;
    const tech = log.children[0].children[2].children[1].textContent;

    if (
      logMessage.toLowerCase().indexOf(text) != -1 ||
      tech.toLowerCase().indexOf(text) != -1
    ) {
      log.style.display = "block";
    } else {
      log.style.display = "none";
    }
  });
  e.preventDefault();
};

document.querySelector("#search").addEventListener("keyup", filterLogs);

document.body.addEventListener("click", function(e) {
  if (e.target.classList.contains("modal-overlay")) {
    ui.clearEdit();
    ui.removeCancelButton();
  }
});
