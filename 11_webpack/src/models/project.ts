
export enum ProjectStatus {
	Active, Finished
}

export class Project {
	public id: string;
	public status: ProjectStatus;
	constructor(public title: string, public descr: string, public people: number) {
		this.id = Math.random().toString();
		this.status = ProjectStatus.Active;
	}
}
