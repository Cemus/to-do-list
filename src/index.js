import "./styles/style.scss";
import {
  allTaskList,
  taskFilter,
  idAttributor,
  listProject,
} from "./listManager.js";
import {
  domCreateTask,
  domReplaceIcon,
  domListFormProject,
} from "./domManipulation";
import {
  projectUpdateTitle,
  createInputProject,
  projectValidation,
  createProjectsFromList,
} from "./projectManager";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import {
  priorityEditor,
  titleEditor,
  dateEditor,
  descriptionEditor,
} from "./taskEditor";

import { localStorageUpdate, initLocalStorage } from "./localStorage";

// ================================================================================

// ================================ Variables =====================================

const addTask = document.getElementById("addTask");
const addProject = document.getElementById("addProject");

const form = document.getElementsByClassName("form-container");
const name = document.getElementById("taskName");
const projectName = document.getElementById("selectionProject");
const date = document.getElementById("taskDueDate");
const priority = document.getElementById("taskPriority");
const desc = document.getElementById("taskDesc");
const submit = document.getElementById("taskSubmit");
const close = document.getElementById("taskClose");

const inboxMenu = document.getElementById("inbox");
const todayMenu = document.getElementById("today");
const upcomingMenu = document.getElementById("upcoming");

let project = "All tasks";

// =================================================================================================

// ================================ Functions d'initialisation =====================================

let customId = initLocalStorage.customId;
const projectList = initLocalStorage.projects;
createProjectsFromList(projectList);
fonctionsUtilitaires(project);
Search();
formHide(true);

// ================================================================================

// ================================================================================

// ================================ Functions =====================================

function fonctionsUtilitaires(project) {
  const search = document.getElementById("search");
  projectUpdateTitle(project);
  domCreateTask(taskFilter(allTaskList, project));
  actualisationTotaux();
  menuSvg();
  taskEditor(project);
  search.value = "";
  localStorageUpdate(allTaskList, listProject(), customId);
}

function createdProjectListener() {
  const createdProjectsSelector =
    document.querySelectorAll(".project-selector");
  createdProjectsSelector.forEach((element) => {
    element.addEventListener("click", () => {
      project = element.children[0].innerHTML;
      fonctionsUtilitaires(project);
    });
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const taskCreate = (id, project, name, date, priority, desc, check) => {
  const dateParsed = parseISO(date);
  return {
    id: id,
    project: project,
    name: name,
    date: format(dateParsed, "dd/MM/Y"),
    priority: `${capitalizeFirstLetter(priority)} priority`,
    desc: desc,
    check: check,
  };
};

function taskReset() {
  name.value = "";
  date.value = "";
  priority.value = "high";
  desc.value = "";
}

function formHide(boolean) {
  const priority = document.getElementById("taskPriority");
  const taskDesc = document.getElementById("taskDesc");
  const submit = document.getElementById("taskSubmit");
  if (boolean === true) {
    form[0].style.opacity = 0;
    form[0].style.zIndex = "-1";
    name.required = false;
    date.required = false;
    priority.style.display = "none";
    taskDesc.style.display = "none";
    submit.style.display = "none";
  } else {
    form[0].style.opacity = "1";
    form[0].style.zIndex = "1";
    name.required = true;
    date.required = true;
    priority.style.display = "initial";
    taskDesc.style.display = "initial";
    submit.style.display = "initial";
  }
}

function menuSvg() {
  //Expand
  const expand = document.querySelectorAll(".expand");
  expand.forEach((element) => {
    element.addEventListener("click", () => {
      const baseMenu = element.parentElement.parentElement;
      const descriptionMenu = baseMenu.nextSibling;
      if (descriptionMenu.style.display === "flex") {
        descriptionMenu.style.display = "none";
      } else {
        descriptionMenu.style.display = "flex";
      }
    });
  });
  //Delete list item
  const trashList = document.querySelectorAll(".trash");
  trashList.forEach((element) => {
    element.addEventListener("click", () => {
      const checkTash = element.parentElement;
      const menuSvg = checkTash.parentElement;
      const baseMenu = menuSvg.parentElement;
      const task = baseMenu.parentElement;
      for (let i = 0; i < allTaskList.length; i++) {
        if (allTaskList[i].id == task.id) {
          allTaskList.splice(i, 1);
          task.remove();
          fonctionsUtilitaires(project);
        }
      }
    });
  });
  //Check
  const check = document.querySelectorAll(".check");
  check.forEach((element) => {
    element.addEventListener("click", () => {
      const checkTash = element.parentElement;
      const menuSvg = checkTash.parentElement;
      const baseMenu = menuSvg.parentElement;
      const task = baseMenu.parentElement;
      if (!task.classList.contains("checked")) {
        domReplaceIcon(element, "uncheck");
        task.classList.add("checked");
        for (let i = 0; i < allTaskList.length; i++) {
          if (allTaskList[i].id == task.id) {
            allTaskList[i].check = true;
            fonctionsUtilitaires(project);
          }
        }
      } else {
        domReplaceIcon(element, "check");
        task.classList.remove("checked");
        for (let i = 0; i < allTaskList.length; i++) {
          if (allTaskList[i].id == task.id) {
            allTaskList[i].check = false;
            fonctionsUtilitaires(project);
          }
        }
      }
    });
  });
  const trashProject = document.querySelectorAll(".trash-project");
  trashProject.forEach((element) => {
    element.addEventListener("click", () => {
      const project = element.parentElement;
      const projectName = element.previousSibling.children[0].innerHTML;
      for (let i = 0; i < allTaskList.length; i++) {
        if (allTaskList[i].project == projectName) {
          allTaskList.splice(i, 1);
        }
      }
      project.remove();
      fonctionsUtilitaires("All tasks");
    });
  });
}

function actualisationTotaux() {
  inboxMenu.children[2].innerHTML = `(${allTaskList.length})`;
  todayMenu.children[2].innerHTML = `(${
    taskFilter(allTaskList, "Today's tasks").length
  })`;
  upcomingMenu.children[2].innerHTML = `(${
    taskFilter(allTaskList, "Upcoming tasks").length
  })`;
  const createdProjects = document.querySelectorAll(".project");
  createdProjects.forEach((element) => {
    element.children[0].children[1].innerHTML = `(${
      taskFilter(allTaskList, element.children[0].children[0].innerHTML).length
    })`;
  });
}

function taskEditor(project) {
  priorityEditor(project);
  titleEditor(project);
  dateEditor(project);
  descriptionEditor(project);
}

function Search() {
  const search = document.getElementById("search");
  search.addEventListener("focus", () => {
    project = "Search mode";
    projectUpdateTitle(project);
  });
  search.addEventListener("keyup", (event) => {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";
    let searchList = [];
    const searchValue = event.target.value;
    for (let i = 0; i < allTaskList.length; i++) {
      if (
        allTaskList[i].project.includes(searchValue) ||
        allTaskList[i].name.includes(searchValue) ||
        allTaskList[i].date.includes(searchValue) ||
        allTaskList[i].desc.includes(searchValue) ||
        allTaskList[i].priority.includes(searchValue)
      ) {
        searchList.push(allTaskList[i]);
        domCreateTask(searchList);
        menuSvg();
        taskEditor(project);
      }
    }
  });
}

function disableScroll() {
  document.body.classList.add("stop-scrolling");
}

function enableScroll() {
  document.body.classList.remove("stop-scrolling");
}
// ================================================================================

// ================================ Listeners =====================================

addTask.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  disableScroll();
  setTimeout(() => {
    formHide(false);
    domListFormProject(listProject());
  }, 250);
});

submit.addEventListener("click", () => {
  if (name.value !== "" && date.value !== "" && priority.value !== "") {
    allTaskList.push(
      taskCreate(
        idAttributor(customId),
        projectName.value,
        name.value,
        date.value,
        priority.value,
        desc.value,
        false
      )
    );
    customId = customId + 1;
    formHide(true);
    enableScroll();
    taskReset();
    fonctionsUtilitaires(project);
  }
});

close.addEventListener("click", () => {
  taskReset();
  formHide(true);
  enableScroll();
});

inboxMenu.addEventListener("click", () => {
  project = "All tasks";
  fonctionsUtilitaires(project);
});
todayMenu.addEventListener("click", () => {
  project = "Today's tasks";
  fonctionsUtilitaires(project);
});
upcomingMenu.addEventListener("click", () => {
  project = "Upcoming tasks";
  fonctionsUtilitaires(project);
});

addProject.addEventListener("click", () => {
  createInputProject();
  projectValidation();
});

// ================================================================================

export { createdProjectListener, fonctionsUtilitaires };
