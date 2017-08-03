export abstract class FileElement {
    id: number
    name: string
    abstract getName(): string
    abstract getSearchValues(): string[]

    static sortByName(a: FileElement, b: FileElement) {
        if(a.name > b.name) { return 1 }
        if(a.name < b.name) { return -1 }
        return 0
    }
}