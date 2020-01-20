export class CacheAsyncQuery {

    data: {[key: string]: any} = {  };

    add(name: string, data: any) {
        this.data[name] = data;
    }

    get(name: string) {
        return this.data[name];
    }

    checkIfExists(name: string) {
        let data = this.data[name];

        if(!data && typeof data !== 'boolean') {
            return false;
        }
        return true;
    }

    set(name: string, data: any) {
        this.data[name] = data;
    }

}