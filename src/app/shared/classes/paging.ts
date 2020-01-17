import { Subject } from "rxjs";

interface OptionType {
    itemsOnPage?: number;
    offset?: number;
    filterCondition(d: any, value: string): boolean;
    sortCondition(x: any, y: any): number;
}

class Paging {

    itemsOnPage: number;
    offset: number;
    filterCondition: (d: any, value: string) => boolean;
    sortCondition: (x: any, y: any) => number;

    valueChanges: Subject<{
        data: any[],
        filtredData: any[],
        pageData: any[]
    }> = new Subject();

    private _enableSorting: boolean = false;

    set enableSorting(value: boolean) {
        this._enableSorting = value;
        this.sort();
    }

    get enableSorting() {
        return this._enableSorting;
    }
    
    private data: any[] = [];
    private filtredData: any[] = [];
    private pageData: any[] = [];
    private notSorted: any[] = [];

    constructor({itemsOnPage, offset, filterCondition, sortCondition}: OptionType) {
        this.itemsOnPage = itemsOnPage || 25;
        this.offset = offset || 0;
        this.filterCondition = filterCondition;
        this.sortCondition = sortCondition;
    }

    setPage(page: number) {
        this.offset = (page - 1) * this.itemsOnPage;
        this.filterPage();
    }

    setData(data: any[]) {
        this.data = data;
        this.filtredData = data;
        this.filterPage();
    }

    sort() {
        if(this.enableSorting) {
            this.notSorted = [...this.filtredData];
            this.filtredData.sort( (a, b) => this.sortCondition(a, b) );
        } else {
            this.filtredData = [...this.notSorted];
        }
        this.filterPage();
    }

    filter(value: string) {
        this.filtredData = this.data.filter( d => this.filterCondition(d, value) );
        this.filterPage();
    }

    filterPage()  {
        let filtredData = [];
        let i = 0;
        let max = this.offset + this.itemsOnPage;
        for(let t of this.filtredData) {
          if(i < this.offset) {
            i++;
            continue;
          }
          else if (i >= max) {
            break;
          } else {
            filtredData.push(t);
          }
    
          i++;
        }
        this.pageData = filtredData;
        this.valueChanges.next({
            data: this.data,
            filtredData: this.filtredData,
            pageData: this.pageData
        });
    }

}

export default Paging;