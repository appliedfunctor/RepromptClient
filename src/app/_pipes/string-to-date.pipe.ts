import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'stringToDate'})
export class stringToDatePipe implements PipeTransform {
    transform(date: string, ...args: string[]): Date {
        return new Date(date)
    }
}