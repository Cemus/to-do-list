function domCreateTask(list) {
  const parent = document.getElementById("task-container");
  parent.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    const task = document.createElement("li");
    task.id = list[i].id;
    const taskBaseMenu = document.createElement("div");
    taskBaseMenu.classList.add("base-menu");
    const taskHiddenMenu = document.createElement("div");
    taskHiddenMenu.classList.add("hidden-menu");
    const taskSelector = document.createElement("div");
    task.classList.add("task");
    if (list[i].check == true) {
      task.classList.add("checked");
    } else {
      task.classList.remove("checked");
    }
    taskSelector.classList.add("task-selector");

    const priority = document.createElement("div");
    priority.classList.add("priority");
    const priorityCircle = document.createElement("div");
    switch (list[i].priority) {
      case "High priority":
        priorityCircle.classList.add("priorityHigh");
        break;
      case "Medium priority":
        priorityCircle.classList.add("priorityMedium");
        break;
      case "Low priority":
        priorityCircle.classList.add("priorityLow");
        break;
    }
    priority.appendChild(priorityCircle);

    taskSelector.appendChild(priority);

    const taskTitle = document.createElement("p");
    const taskTitleText = document.createTextNode(list[i].name); //
    taskTitle.classList.add("taskTitle");
    const taskDate = document.createElement("p");
    const taskDateText = document.createTextNode(list[i].date); //
    taskDate.classList.add("taskDeadline");
    taskTitle.appendChild(taskTitleText);
    taskDate.appendChild(taskDateText);

    const taskDesc = document.createElement("p");
    taskDesc.classList.add("taskDescription");
    let taskDescText;
    if (list[i].desc == "") {
      taskDescText = document.createTextNode("No description!"); //
    } else {
      taskDescText = document.createTextNode(list[i].desc); //
    }
    taskDesc.appendChild(taskDescText);

    //menu SVG
    const menuSvg = document.createElement("div");
    menuSvg.classList.add("menu-svg");
    //
    //expand
    const expand = document.createElement("div");
    expand.classList.add("expand");
    expand.classList.add("svg-selector");
    expand.classList.add("icon");
    expand.classList.add("button");
    const expandSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const expandPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    expandSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    expandSvg.setAttribute("viewBox", "0 0 24 24");
    expandSvg.classList.add("icon");
    expandSvg.classList.add("button");
    expandPath.setAttribute(
      "d",
      "M11 7V9H13V7H11M14 17V15H13V11H10V13H11V15H10V17H14M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12M20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12Z"
    );

    expandSvg.appendChild(expandPath);
    expand.appendChild(expandSvg);
    //

    const checkTrash = document.createElement("div");
    checkTrash.classList.add("check-trash");
    //check
    const check = document.createElement("div");
    check.classList.add("check");
    check.classList.add("svg-selector");
    check.classList.add("icon");
    check.classList.add("button");
    const checkSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const checkPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    checkSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    checkSvg.setAttribute("viewBox", "0 0 24 24");
    checkSvg.classList.add("icon");
    checkSvg.classList.add("button");
    switch (list[i].check) {
      case true:
        checkPath.setAttribute(
          "d",
          "M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z"
        );
        break;
      case false:
        checkPath.setAttribute(
          "d",
          "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
        );
        break;
    }

    checkSvg.appendChild(checkPath);
    check.appendChild(checkSvg);
    //end check

    //trash
    const trash = document.createElement("div");
    trash.classList.add("trash");
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
    taskSelector.appendChild(taskTitle);
    taskSelector.appendChild(taskDate);
    taskBaseMenu.appendChild(taskSelector);
    checkTrash.appendChild(check);
    checkTrash.appendChild(trash);
    menuSvg.appendChild(expand);
    menuSvg.appendChild(checkTrash);
    taskBaseMenu.appendChild(menuSvg);
    task.appendChild(taskBaseMenu);
    taskHiddenMenu.appendChild(taskDesc);
    task.appendChild(taskHiddenMenu);
    parent.appendChild(task);
  }
}

function domListFormProject(list) {
  const parent = document.getElementById("selectionProject");
  parent.innerHTML = "";
  let inbox = document.createElement("option");
  inbox.value = "inbox";
  inbox.innerHTML = "Inbox";
  parent.appendChild(inbox);
  for (let i = 0; i < list.length; i++) {
    let option = document.createElement("option");
    option.value = list[i];
    option.innerHTML = list[i];
    parent.appendChild(option);
  }
}

function domReplaceIcon(parent, svgToCreate) {
  parent.innerHTML = "";
  if (svgToCreate === "uncheck") {
    //cancel
    const cancelSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const cancelPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    cancelSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    cancelSvg.setAttribute("viewBox", "0 0 24 24");
    cancelSvg.classList.add("icon");
    cancelSvg.classList.add("button");
    cancelPath.setAttribute(
      "d",
      "M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z"
    );
    cancelSvg.appendChild(cancelPath);
    parent.appendChild(cancelSvg);
  } else {
    //check
    const checkSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const checkPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    checkSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    checkSvg.setAttribute("viewBox", "0 0 24 24");
    checkSvg.classList.add("icon");
    checkSvg.classList.add("button");
    checkPath.setAttribute(
      "d",
      "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
    );
    checkSvg.appendChild(checkPath);
    parent.appendChild(checkSvg);
  }
}

export { domCreateTask, domListFormProject, domReplaceIcon };
