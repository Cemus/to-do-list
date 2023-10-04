import { createdProjectListener } from ".";
import { fonctionsUtilitaires } from ".";

function projectUpdateTitle(project) {
  const projectTitle = document.getElementById("title-project");
  projectTitle.innerHTML = project;
}

function createInputProject() {
  const parent = document.getElementById("projectContainer");
  const project = document.createElement("div");
  project.classList.add("project-creator");
  const projectName = document.createElement("input");
  projectName.maxLength = 18;
  projectName.placeholder = "My new project";
  project.appendChild(projectName);
  parent.appendChild(project);
  projectName.focus();
}

function createProject(name) {
  const parent = document.getElementById("projectContainer");
  const project = document.createElement("li");
  const projectNameAndTotal = document.createElement("div");
  projectNameAndTotal.classList.add("project-selector");
  project.classList.add("project");
  const projectName = document.createElement("button");
  const projectNameText = document.createTextNode(name);
  projectName.appendChild(projectNameText);
  projectNameAndTotal.appendChild(projectName);
  const totalTask = document.createElement("p");
  totalTask.classList.add("total-task");
  const totalTaskText = document.createTextNode("(0)");
  totalTask.appendChild(totalTaskText);
  projectNameAndTotal.appendChild(totalTask);
  project.appendChild(projectNameAndTotal);

  //trash
  const trash = document.createElement("div");
  trash.classList.add("trash-project");
  trash.classList.add("svg-selector");
  trash.classList.add("icon");
  trash.classList.add("button");
  const trashSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  const trashPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  trashSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  trashSvg.setAttribute("viewBox", "0 0 24 24");
  trashSvg.classList.add("icon");
  trashSvg.classList.add("button");
  trashPath.setAttribute(
    "d",
    "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
  );

  trashSvg.appendChild(trashPath);
  trash.appendChild(trashSvg);
  //end trash
  project.appendChild(trash);

  parent.appendChild(project);
}

function projectValidation() {
  const projectsCreator = document.querySelectorAll(".project-creator");
  projectsCreator.forEach((element) => {
    let enterPressed = false;
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        enterPressed = true;
        projectNameValidation(element.children[0].value);
        return;
      }
    });
    element.addEventListener("focusout", () => {
      if (!enterPressed) {
        projectNameValidation(element.children[0].value);
        return;
      }
    });
  });
}

function projectNameValidation(valeur) {
  const projectContainer = document.getElementById("projectContainer");
  if (valeur === "") {
    valeur = `My new project ${projectContainer.children.length}`;
  }
  createProject(valeur);
  const creator = document.querySelectorAll(".project-creator");
  creator.forEach((element) => {
    element.remove();
    projectClick();
  });
  createdProjectListener();
  fonctionsUtilitaires(valeur);
}

function projectClick() {
  const projects = document.querySelectorAll(".project-selector");
  projects.forEach((element) => {
    element.addEventListener("click", () => {
      const projectClicked = element.children[0];
      const name = projectClicked.innerHTML;
      projectUpdateTitle(name);
    });
  });
}

function createProjectsFromList(list) {
  for (let i = 0; i < list.length; i++) {
    createProject(list[i]);
  }
  projectClick();
}

export {
  projectUpdateTitle,
  createProject,
  createInputProject,
  projectValidation,
  createProjectsFromList,
};
