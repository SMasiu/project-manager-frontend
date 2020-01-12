import { Subject } from 'rxjs';

class CacheQuery {

    data: any[] = [];
    lastValidation = true;
    validationChanges: Subject<boolean> = new Subject();

    constructor(private validationFunction: Function) { }

    add(data: any) {
        this.data.push(data);
        this.onInvalidQuery();
    }

    validate(data) {
        let index = this.data.findIndex( d => this.validationFunction(data, d) );
        return index === -1;
    }

    onChange(data) {
        let valid =this.validate(data);
        this.lastValidation = valid;
        this.validationChanges.next(valid);
    }

    onInvalidQuery() {
        this.lastValidation = false;
        this.validationChanges.next(false);
    }

}

export default CacheQuery;