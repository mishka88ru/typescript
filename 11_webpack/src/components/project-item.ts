
import { autobind } from "../decorators/autobind";
import { Draggable } from "../models/drag-drop";
import Component from "../components/base-component";
import { Project } from "../models/project";

export class ProjectItem
	extends Component<HTMLUListElement, HTMLLIElement>
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
		this.element.querySelector("h3")!.textContent =
		this.numAssigned + " assigned";
		this.element.querySelector("p")!.textContent = this.prj.descr;
	}

	@autobind
	dragStartHandler(event: DragEvent): void {
		event.dataTransfer!.setData("text/plain", this.prj.id);
		event.dataTransfer!.effectAllowed = "move";
	}

	dragEndHandler(_: DragEvent): void {
		
	}
}
