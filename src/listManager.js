import { domListFormProject } from "./domManipulation";

let allTaskList = [];

function taskFilter(allTaskList, logic) {
  let finalList = [];
  const currentDate = new Date().toLocaleDateString();
  for (let i = 0; i < allTaskList.length; i++) {
    if (logic == "All tasks") {
      finalList = [...allTaskList];
    }
    if (logic == "Today's tasks") {
      if (allTaskList[i].date === currentDate) {
        finalList.push(allTaskList[i]);
      }
    } else if (logic == "Upcoming tasks") {
      if (allTaskList[i].date !== currentDate) {
        finalList.push(allTaskList[i]);
      }
    } else {
      if (allTaskList[i].project == logic) {
        finalList.push(allTaskList[i]);
      }
    }
  }
  return finalList;
}

const idAttributor = (customId) => {
  customId = customId + 1;
  return customId - 1;
};

function listFormProject() {
  let list = [];
  const projectContainer = document.getElementById("projectContainer");
  for (let i = 0; i < projectContainer.childElementCount; i++) {
    const child = projectContainer.children[i].children[0].children[0];
    list.push(child.innerHTML);
  }
  domListFormProject(list);
}

export { allTaskList, taskFilter, idAttributor, listFormProject };
