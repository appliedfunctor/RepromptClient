import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'shorten'})
export class ShortenPipe implements PipeTransform {
    transform(value: String, ...args: String[]) {
        length = (args && args[0]) ? length = Number(args[0]) : 15;
        if(value.length > length) {
            return value.split('/').join(' / ')
        } else {
            return value
        }
    }
}