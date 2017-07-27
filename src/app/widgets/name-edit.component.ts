import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'name-edit-widget',
    templateUrl: 'name-edit.component.html'
})
export class NameEditComponent {

    @Input() element: string
    @Input() active: boolean
    @Output() valueChange = new EventEmitter<string>()
    name: string = ''
    editText: string = 'Save'

    submit() {
        if(this.name && this.name != '') {
            this.valueChange.emit(this.name)
        }
    }

}