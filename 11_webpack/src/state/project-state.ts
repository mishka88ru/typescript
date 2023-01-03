
import { Project, ProjectStatus } from "../models/project";

type Listener<T> = (items: T[]) => void;

class State<T> {
	protected listeners: Listener<T>[] = [];

	addListener(fn: Listener<T>) {
		this.listeners.push(fn);
	}
}

export class ProjectState extends State<Project> {
	private projects: Project[] = [];
	private static instance: ProjectState;

	private constructor() {
		super();
	}

	static getInstance() {
		if (!ProjectState.instance)
			ProjectState.instance = new ProjectState();
		return ProjectState.instance
	}

	addProject(prj: Project) {
		this.projects.push(prj);
		this.updateListeners();
	}

	moveProject(id: string, status: ProjectStatus) {
		const prj = this.projects.find(prj => prj.id === id);
		if (prj && prj.status !== status) {
			prj.status = status;
			this.updateListeners();
		}
	}

	private updateListeners() {
		for (const fn of this.listeners) {
			fn(this.projects.slice());
		}
	}
}

export const projectState = ProjectState.getInstance();
