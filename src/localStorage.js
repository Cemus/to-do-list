const initLocalStorage = (() => {
  const tasks = JSON.parse(localStorage.getItem("localTaskList")) || [];
  const projects = JSON.parse(localStorage.getItem("localProjectList")) || [];
  const customId = JSON.parse(localStorage.getItem("localCustomId")) || 0;
  return {
    tasks,
    projects,
    customId,
  };
})();

function localStorageUpdate(tasks, projects, id) {
  localStorage.setItem("localTaskList", JSON.stringify(tasks));
  localStorage.setItem("localProjectList", JSON.stringify(projects));
  localStorage.setItem("localCustomId", JSON.stringify(id));
}

export { initLocalStorage, localStorageUpdate };
