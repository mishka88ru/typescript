/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../components/project-item.ts" />
/// <reference path="../models/project.ts" />

namespace App {
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DDInterfaces.DropTarget
  {
    list: HTMLElement;
    assigned: Project[];

    private static typename(type: ProjectStatus) {
      return ProjectStatus[type].toLowerCase();
    }

    constructor(private type: ProjectStatus) {
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
      projectState.moveProject(prjID, this.type);
      this.list.classList.remove("droppable");
    }

    @autobind
    dragLeaveHandler(_: DragEvent): void {
      this.list.classList.remove("droppable");
    }
  }
}
