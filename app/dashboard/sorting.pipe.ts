/**
 * Created by skylele on 10.4.17.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: "sortBy"})
export class sortPipe {
    transform(array: Array<string>, args: string, reversed: Boolean): Array<string> {
        if(!array || array === undefined || array.length === 0) return null;
        if(reversed)
            array.sort((a: any, b: any) => {
                if ( a[args] > b[args] ){
                    return -1;
                }else if( a[args] < b[args] ){
                    return 1;
                }else{
                    return 0;
                }
            });
        else
            array.sort((a: any, b: any) => {
                if ( a[args] < b[args] ){
                    return -1;
                }else if( a[args] > b[args] ){
                    return 1;
                }else{
                    return 0;
                }
            });
        return array;
    }
}