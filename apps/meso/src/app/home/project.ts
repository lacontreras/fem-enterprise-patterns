const PROJECT_LOAD = '[Project] Load';
const PROJECT_CREATE = '[Project] Create';
const PROJECT_UPDATE = '[Project] Update';
const PROJECT_DELETE = '[Project] Delete';
const PROJECT_SELECT = '[Project] Select';
const PROJECT_CLEAR = '[Project] Clear';

const loadProjects = (state, projects) => {
  console.log('LOAD PROJECTS!', projects);
  return state;
};

const createProject = (state, project) => {
  console.log('CREATE PROJECT', project);
  return state;
};

const selectProject = (state, project) => {
  console.log('SELECT PROJECT!', project);
  return state;
};

const deleteProject = (state, project) => {
  console.log('DELETE PROJECT', project);
  return state;
};

const updateProject = (state, project) => {
  console.log('UPDATE PROJECT', project);
  return state;
};

const clearProject = (state, projects) => {
  console.log('CLEAR PROJECTS', projects);
  return state;
};

const projectsReducer = (
  state: ProjectsState = initialProjectsState,
  action: Action
) => {
  switch (action.type) {
    case PROJECT_LOAD:
      return loadProjects(state, action.payload);
    case PROJECT_SELECT:
      return selectProject(state, action.payload);
    case PROJECT_CLEAR:
      return clearProject(state, action.payload);
    case PROJECT_UPDATE:
      return updateProject(state, action.payload);
    case PROJECT_CREATE:
      return loadProjects(state, action.payload);
    case PROJECT_CLEAR:
      return loadProjects(state, action.payload);
    default:
      return state;
  }
};
