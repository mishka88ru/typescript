
import { autobind } from "../decorators/autobind.js";
import { DropTarget } from "../models/drag-drop.js";
import BaseComponent from "../components/base-component.js";
import { ProjectItem } from "../components/project-item.js";
import * as PRJ from "../models/project.js";
import { projectState as ps } from "../state/project-state.js";

export class ProjectList
	extends BaseComponent<HTMLDivElement, HTMLElement>
	implements DropTarget
{
	list: HTMLElement;
	assigned: PRJ.Project[];

	private static typename(type: PRJ.ProjectStatus) {
		return PRJ.ProjectStatus[type].toLowerCase();
	}

	constructor(private type: PRJ.ProjectStatus) {
		super(
		"project-list",
		"app",
		false,
		`${ProjectList.typename(type)}-projects`
		);

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

		ps.addListener((projects: PRJ.Project[]) => {
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
		this.element.querySelector("h2")!.textContent =
		ProjectList.typename(this.type).toUpperCase() + " PROJECTS";
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
		ps.moveProject(prjID, this.type);
		this.list.classList.remove("droppable");
	}

	@autobind
	dragLeaveHandler(_: DragEvent): void {
		this.list.classList.remove("droppable");
	}
}
