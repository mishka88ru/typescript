/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../models/project.ts" />

namespace App {
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements DDInterfaces.Draggable
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

    dragEndHandler(_: DragEvent): void {}
  }
}
