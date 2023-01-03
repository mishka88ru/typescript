/// <reference path="base-component.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {

	export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}
