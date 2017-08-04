import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'summary'})
export class SummaryPipe implements PipeTransform {
    transform(value: String, ...args: String[]) {
        length = (args && args[0]) ? length = Number(args[0]) : 15;
        if(value.length > length) {
            return value.split(' ').slice(0, length).join(' ') + '...'
        } else {
            return value
        }
    }
}