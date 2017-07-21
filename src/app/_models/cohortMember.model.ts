export class CohortMemberModel {
    cohortId: number;
    userId: number;

    constructor(data) {
        this.cohortId = data.cohortId ? data.cohortId : null;
        this.userId = data.userId ? data.userId : null;
    }
}