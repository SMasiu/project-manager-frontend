import { Subject } from "rxjs";

interface OptionType {
    itemsOnPage?: number;
    offset?: number;
    filterCondition(d: any, value: string): boolean;
}

class Paging {

    itemsOnPage: number;
    offset: number;
    filterCondition: (d: any, value: string) => boolean;

    valueChanges: Subject<{
        data: any[],
        filtredData: any[],
        pageData: any[]
    }> = new Subject();

    private data: any[] = [];
    private filtredData: any[] = [];
    private pageData: any[] = [];

    constructor({itemsOnPage, offset, filterCondition}: OptionType) {
        this.itemsOnPage = itemsOnPage || 25;
        this.offset = offset || 0;
        this.filterCondition = filterCondition;
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