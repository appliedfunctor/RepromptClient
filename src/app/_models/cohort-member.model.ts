import { FileElement } from 'app/_models/file-element.model'

export class CohortMemberModel implements FileElement {
    id: number;
    name: string;
    cohortId: number;
    userId: number;

    constructor(data) {
        this.cohortId = data.cohortId ? data.cohortId : null;
        this.userId = data.userId ? data.userId : null;
    }

    getName(): string {
        return this.name;
    }
    getSearchValues(): string[] {
        return [this.name];
    }


}