
interface Draggable {
	dragStartHandler(event: DragEvent): void;
	dragEndHandler(event: DragEvent): void;
}

interface DropTarget {
	dragOverHandler(event: DragEvent): void;
	dropHandler(event: DragEvent): void;
	dragLeaveHandler(event: DragEvent): void;
}


enum ProjectStatus {
	Active, Finished
}

class Project {
	public id: string;
	public status: ProjectStatus;
	constructor(public title: string, public descr: string, public people: number) {
		this.id = Math.random().toString();
		this.status = ProjectStatus.Active;
	}
}


type Listener<T> = (items: T[]) => void;

class State<T> {
	protected listeners: Listener<T>[] = [];

	addListener(fn: Listener<T>) {
		this.listeners.push(fn);
	}
}

class ProjectState extends State<Project> {
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

const projectState = ProjectState.getInstance();



interface Validateable {
	value: string | number;
	required: boolean;
	minLength?: number;
	maxLength?: number;
	minValue?: number;
	maxValue?: number;
}

function validate(v: Validateable) {
	if (v.required && v.value.toString().trim().length === 0)
		return false;
	if (typeof v.value === "string") {
		if (v.minLength != null && (v.value.length < v.minLength))
			return false;
		if (v.maxLength != null && (v.value.length > v.maxLength))
			return false;
	}
	else {
		if (v.minValue != null && (v.value < v.minValue))
			return false;
		if (v.maxValue != null && (v.value > v.maxValue))
			return false;
	}

	return true;
}

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		}
	}
	return adjDescriptor;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	templateElement: HTMLTemplateElement;
	hostElement:     T;
	element:         U;

	constructor(templateID: string, hostID: string, atStart: boolean, elementID?: string) {
		this.templateElement = document.getElementById(templateID)! as HTMLTemplateElement;
		this.hostElement = document.getElementById(hostID)! as T;

		const importedNode = document.importNode(this.templateElement.content, true);
		this.element = importedNode.firstElementChild as U;
		if (elementID)
			this.element.id = elementID;

		this.attach(atStart);
	}
	
	private attach(atStart: boolean) {
		this.hostElement.insertAdjacentElement(atStart ? "afterbegin" : "beforeend", this.element);
	}

	abstract configure(): void;
	abstract renderContent(): void;
}


class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInput: HTMLInputElement;
	descriptionInput: HTMLInputElement;
	peopleInput: HTMLInputElement;

	constructor() {
		super("project-input", "app", false, "user-input");

		this.titleInput = this.element.querySelector("#title")! as HTMLInputElement;
		this.descriptionInput = this.element.querySelector("#description")! as HTMLInputElement;
		this.peopleInput = this.element.querySelector("#people")! as HTMLInputElement;

		this.configure();
	}

	configure() {
		this.element.addEventListener("submit", this.submitHandler);
	}

	renderContent(): void {
		
	}

	@autobind
	private submitHandler(e: Event) {
		e.preventDefault();
		const prj = this.gatherUserInput();
		if (prj) {
			projectState.addProject(prj);
			this.clearUserInput();
		}
	}

	private gatherUserInput(): Project | null {
		const title  =  this.titleInput.value;
		const descr  =  this.descriptionInput.value;
		const people = +this.peopleInput.value;

		if (
			!validate({value: title, required: true, minLength: 5}) ||
			!validate({value: descr, required: true, minLength: 5}) ||
			!validate({value: people, required: true, minValue: 1})
		) {
			alert("Invalid input, please try again!");
			return null;
		}

		return new Project(title, descr, people);
	}

	private clearUserInput() {
		this.titleInput.value = "";
		this.descriptionInput.value = "";
		this.peopleInput.value = "";
	}
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
	              implements Draggable
{
	constructor(hostID: string, private prj: Project) {
		super("single-project", hostID, false, prj.id);

		this.configure();
		this.renderContent();
	}

	get numAssigned() {
		return this.prj.people === 1 ? "1 person" : `${this.prj.people} persons`;
	}

	configure(): void {
		this.element.addEventListener("dragstart", this.dragStartHandler);
		this.element.addEventListener("dragend", this.dragEndHandler);
	}

	renderContent(): void {
		this.element.querySelector("h2")!.textContent = this.prj.title;
		this.element.querySelector("h3")!.textContent = this.numAssigned + " assigned";
		this.element.querySelector("p")!.textContent  = this.prj.descr;
	}

	@autobind
	dragStartHandler(event: DragEvent): void {
		event.dataTransfer!.setData("text/plain", this.prj.id);
		event.dataTransfer!.effectAllowed = "move";
	}

	dragEndHandler(_: DragEvent): void {
	}
}

class ProjectList extends Component<HTMLDivElement, HTMLElement>
	              implements DropTarget
{
	list:      HTMLElement;
	assigned:  Project[];

	private static typename(type: ProjectStatus) {
		return ProjectStatus[type].toLowerCase();
	}

	constructor(private type: ProjectStatus) {
		super("project-list", "app", false, `${ProjectList.typename(type)}-projects`);
		
		this.list = this.element.querySelector("ul")!;
		this.assigned = [];

		this.configure();
		this.renderContent();
	}

	configure(): void {
		this.list.id = `${ProjectList.typename(this.type)}-projects-list`;

		this.element.addEventListener("dragover", this.dragOverHandler);
		this.element.addEventListener("drop", this.dropHandler);
		this.element.addEventListener("dragleave", this.dragLeaveHandler);

		projectState.addListener((projects: Project[]) => {
			this.assigned = [];
			for (const prj of projects) {
				if (prj.status === this.type) {
					this.assigned.push(prj);
				}
			}
			this.renderProjects();
		});
	}

	renderContent() {
		this.element.querySelector("h2")!.textContent = ProjectList.typename(this.type).toUpperCase() + " PROJECTS";
	}

	private renderProjects() {
		this.list.innerHTML = "";
		for (const prj of this.assigned) {
			new ProjectItem(this.list.id, prj);
		}
	}

	@autobind
	dragOverHandler(event: DragEvent): void {
		if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
			event.preventDefault();
			this.list.classList.add("droppable");
		}
	}

	@autobind
	dropHandler(event: DragEvent): void {
		const prjID = event.dataTransfer!.getData("text/plain");
		projectState.moveProject(prjID, this.type);
		this.list.classList.remove("droppable");
	}

	@autobind
	dragLeaveHandler(_: DragEvent): void {
		this.list.classList.remove("droppable");
	}
}

const input = new ProjectInput();
const active = new ProjectList(ProjectStatus.Active);
const finished = new ProjectList(ProjectStatus.Finished);
