import { Component, OnInit } from '@angular/core';

interface BaseEntity {
  id: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

interface Client extends BaseEntity {
  firstName: string;
  lastName: string;
  company: string;
}

const peter: Client = {
  id: '1',
  firstName: 'Peter',
  lastName: 'Parker',
  company: 'Acme, Inc',
};

const john: Client = {
  id: '2',
  firstName: 'John',
  lastName: 'Doe',
  company: 'NA',
};

const clients: Client[] = [peter, john];

interface ClientsState {
  clients: Client[];
  currentClient: Client;
}
const newClient: Client = {
  id: null,
  firstName: '',
  lastName: '',
  company: '',
};

const initialClientsState: ClientsState = {
  clients,
  currentClient: newClient,
};

const CLIENT_LOAD = '[Client] Load';
const CLIENT_CREATE = '[Client] Create';
const CLIENT_UPDATE = '[Client] Update';
const CLIENT_DELETE = '[Client] Delete';
const CLIENT_SELECT = '[Client] Select';
const CLIENT_CLEAR = '[Client] Clear';

const loadClients = (state, clients): ClientsState => {
  return {
    clients,
    currentClient: state.currentClient,
  };
};

const selectClient = (state, client): ClientsState => {
  return {
    clients: state.clients,
    currentClient: client,
  };
};

const clearClient = (state): ClientsState => {
  return {
    clients: state.clients,
    currentClient: null,
  };
};

const createClient = (state, client): ClientsState => {
  return {
    clients: [...state.clients, client],
    currentClient: state.currentClient,
  };
};

const updateClient = (state, client): ClientsState => {
  return {
    clients: state.clients.map((c) => {
      return c.id !== client.id ? Object.assign({}, client) : c;
    }),
    currentClient: state.currentClient,
  };
};

const deleteClient = (state, client): ClientsState => {
  return {
    clients: state.clients.filter((c) => c.id !== client.id),
    currentClient: state.currentClient,
  };
};

const clientsReducer = (
  state: ClientsState = initialClientsState,
  action: Action
) => {
  switch (action.type) {
    case CLIENT_LOAD:
      return loadClients(state, action.payload);
    case CLIENT_SELECT:
      return selectClient(state, action.payload);
    case CLIENT_CLEAR:
      return clearClient(state);
    case CLIENT_CREATE:
      return createClient(state, action.payload);
    case CLIENT_UPDATE:
      return updateClient(state, action.payload);
    case CLIENT_DELETE:
      return deleteClient(state, action.payload);
    default:
      return state;
  }
};

class ClientsStore {
  reducer;
  state: ClientsState;

  constructor(state: ClientsState, reducer) {
    this.state = state;
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }

  select(key: string) {
    return this.state[key];
  }

  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
  }

  // load(newClients: Client[]) {
  //   this.clients = newClients;
  // }

  // select(client: Client) {
  //   this.currentClient = client;
  // }
  // create(newClient: Client) {
  //   this.clients = [...this.clients, newClient];
  // }
}

const jane: Client = {
  id: '123',
  firstName: 'Jane',
  lastName: 'Doe',
  company: 'Fake Inc',
};

const clientsStore = new ClientsStore(initialClientsState, clientsReducer);

const aClient = clientsStore.select('currentClient');

clientsStore.dispatch({ type: CLIENT_CREATE, payload: jane });

const allClients = clientsStore.select('clients');

const currentClient = clientsStore.select('currentClient');

//* This is essentially a version of Redux...
//* An incredibly simple pattern!!!!
//* to manage the state in scale

// clientsStore.load(clients);
// clientsStore.select(peter);

//! Client section over!

interface Project extends BaseEntity {
  title: string;
  description: string;
  completed: boolean;
}

const project: Project = {
  id: '123',
  title: 'Project',
  description: 'LastName',
  completed: false,
};

const project1: Project = {
  id: '1234',
  title: 'Another',
  description: 'Project',
  completed: true,
};

const PROJECT_LOAD = '[Project] Load';
const PROJECT_CREATE = '[Project] Create';
const PROJECT_UPDATE = '[Project] Update';
const PROJECT_DELETE = '[Project] Delete';
const PROJECT_SELECT = '[Project] Select';
const PROJECT_CLEAR = '[Project] Clear';

const loadProjects = (state, projects) => {
  return {
    projects,
    currentProject: state.currentProject,
  };
};

const createProject = (state, project) => {
  return {
    projects: [...state.projects, project],
    currentProject: state.currentProject,
  };
};

const selectProject = (state, project) => {
  return {
    projects: state.projects,
    currentProject: project,
  };
};

const deleteProject = (state, project) => {
  return {
    projects: state.projects.filter((p) => p.id !== project.id),
    currentProject: state.currentProject,
  };
};

const updateProject = (state, project) => {
  return {
    projects: state.projects.map((p) => {
      return p.id !== project.id ? Object.assign({}, project) : p;
    }),
    currentProject: state.currentProject,
  };
};

const clearProject = (state) => {
  return {
    projects: state.projects,
    currentProject: null,
  };
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
      return clearProject(state);
    case PROJECT_UPDATE:
      return updateProject(state, action.payload);
    case PROJECT_CREATE:
      return createProject(state, action.payload);
    case PROJECT_DELETE:
      return deleteProject(state, action.payload);
    default:
      return state;
  }
};

const projects: Project[] = [project, project1];

const newProject: Project = {
  id: null,
  title: '',
  description: '',
  completed: false,
};

interface ProjectsState {
  projects: Project[];
  currentProject: Project;
}

const initialProjectsState: ProjectsState = {
  projects,
  currentProject: newProject,
};

class ProjectsStore {
  state: ProjectsState;

  constructor(state: ProjectsState) {
    this.state = state;
  }

  getState(): ProjectsState {
    return this.state;
  }

  select(key: string) {
    return this.state[key];
  }
}

const projectsStore = new ProjectsStore(initialProjectsState);
const currentProjects = projectsStore.select('projects');

interface AppState {
  clientsState: ClientsState;
  projectsState: ProjectsState;
}

const appState: AppState = {
  clientsState: initialClientsState,
  projectsState: initialProjectsState,
};

const tango = allClients;

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  echo = tango;
}
