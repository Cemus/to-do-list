import { parseISO } from "date-fns";
import { format } from "date-fns";
import { allTaskList } from "./listManager";
import { fonctionsUtilitaires } from ".";

function priorityEditor() {
  const priority = document.querySelectorAll(".priority");
  priority.forEach((element) => {
    element.addEventListener("click", () => {
      const taskSelector = element.parentElement;
      const baseMenu = taskSelector.parentElement;
      const task = baseMenu.parentElement;
      switch (element.children[0].className) {
        case "priorityLow":
          element.children[0].className = "priorityMedium";
          for (let i = 0; i < allTaskList.length; i++) {
            if (allTaskList[i].id == task.id) {
              allTaskList[i].priority = "Medium priority";
            }
          }
          break;
        case "priorityMedium":
          element.children[0].className = "priorityHigh";
          for (let i = 0; i < allTaskList.length; i++) {
            if (allTaskList[i].id == task.id) {
              allTaskList[i].priority = "High priority";
            }
          }
          break;
        case "priorityHigh":
          element.children[0].className = "priorityLow";
          for (let i = 0; i < allTaskList.length; i++) {
            if (allTaskList[i].id == task.id) {
              allTaskList[i].priority = "Low priority";
            }
          }
          break;
      }
    });
  });
}

function titleEditor(project) {
  const title = document.querySelectorAll(".taskTitle");
  title.forEach((element) => {
    const taskSelector = element.parentElement;
    const baseMenu = taskSelector.parentElement;
    const task = baseMenu.parentElement;
    element.addEventListener("click", () => {
      const newTitle = document.createElement("input");
      newTitle.setAttribute("type", "text");
      newTitle.setAttribute("class", "editor");
      newTitle.setAttribute("placeholder", "Task title");
      newTitle.value = element.textContent;
      taskSelector.insertBefore(newTitle, element);
      element.remove();
      newTitle.focus();
      editorValidation(newTitle, task.id, "name", project);
    });
  });
}

function dateEditor(project) {
  const date = document.querySelectorAll(".taskDeadline");
  date.forEach((element) => {
    const taskSelector = element.parentElement;
    const baseMenu = taskSelector.parentElement;
    const task = baseMenu.parentElement;
    element.addEventListener("click", () => {
      const newDate = document.createElement("input");
      newDate.setAttribute("type", "date");
      newDate.setAttribute("class", "editor");
      taskSelector.insertBefore(newDate, element);
      element.remove();
      newDate.focus();
      editorDateValidation(newDate, task.id, project);
    });
  });
}

function editorDateValidation(edited, task, project) {
  const taskSelector = edited.parentElement;
  edited.addEventListener("focusout", () => {
    const taskDate = document.createElement("p");
    taskDate.classList.add("taskDeadline");
    const dateParsed = parseISO(edited.value);
    const taskDateText = document.createTextNode(format(dateParsed, "dd/MM/Y"));
    taskDate.appendChild(taskDateText);
    taskSelector.insertBefore(taskDate, edited);
    edited.remove();
    for (let i = 0; i < allTaskList.length; i++) {
      if (allTaskList[i].id == task) {
        allTaskList[i].date = taskDateText.textContent;
        fonctionsUtilitaires(project);
      }
    }
  });
}

function descriptionEditor(project) {
  const desc = document.querySelectorAll(".taskDescription");
  desc.forEach((element) => {
    const hiddenMenu = element.parentElement;
    const task = hiddenMenu.parentElement;
    element.addEventListener("click", () => {
      const newDesc = document.createElement("input");
      newDesc.setAttribute("type", "text");
      newDesc.setAttribute("class", "editor");
      newDesc.setAttribute("placeholder", "Description");
      newDesc.value = element.textContent;
      hiddenMenu.insertBefore(newDesc, element);
      element.remove();
      newDesc.focus();
      editorValidation(newDesc, task.id, "description", project);
    });
  });
}

function editorValidation(edited, task, element, project) {
  switch (element) {
    case "name":
      const taskSelector = edited.parentElement;
      edited.addEventListener("focusout", () => {
        const taskTitle = document.createElement("p");
        taskTitle.classList.add("taskTitle");
        const taskTitleText = document.createTextNode(edited.value);
        taskTitle.appendChild(taskTitleText);
        taskSelector.insertBefore(taskTitle, edited);
        edited.remove();
        for (let i = 0; i < allTaskList.length; i++) {
          if (allTaskList[i].id == task) {
            allTaskList[i].name = taskTitleText.textContent;
            fonctionsUtilitaires(project);
          }
        }
      });
      break;
    case "description":
      const hiddenMenu = edited.parentElement;
      edited.addEventListener("focusout", () => {
        const taskDesc = document.createElement("p");
        taskDesc.classList.add("taskDescription");
        const taskDescText = document.createTextNode(edited.value);
        taskDesc.appendChild(taskDescText);
        hiddenMenu.insertBefore(taskDesc, edited);
        edited.remove();
        for (let i = 0; i < allTaskList.length; i++) {
          if (allTaskList[i].id == task) {
            allTaskList[i].desc = taskDescText.textContent;
            fonctionsUtilitaires(project);
          }
        }
      });
      break;
  }
}

export { priorityEditor, titleEditor, dateEditor, descriptionEditor };
