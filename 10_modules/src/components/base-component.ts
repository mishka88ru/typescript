
namespace App {
	export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
}