import { Router } from "@angular/router";

interface NavItemType {
    value: string;
    icon: string;
    top: number;
    path: string;
    displayIfLogged: number;
    extendedPath?: string[];
}

class NavbarItem {

    value: string;
    icon: string;
    top: number;
    path: string;
    displayIfLogged: number;
    active: boolean = false;
    extendedPath: string[];

    constructor(private router: Router, {value, icon, top, path, displayIfLogged, extendedPath}: NavItemType) {
        this.value = value;
        this.icon = icon;
        this.top = top;
        this.path = path;
        this.displayIfLogged = displayIfLogged;
        this.extendedPath = extendedPath || [];
    }

    navigate() {
        this.router.navigateByUrl(this.path);
    } 

    isActive(url: string) {
        const valid = this.path === url || this.isInExtended(url);
        this.active = valid; 
        return valid;
    }

    isInExtended(url: string) {
        for(let e of this.extendedPath) {
            if(e === url) {
                return true;
            }
            let idx = e.indexOf('*');
            if(idx !== -1) {
                if(e.substr(0, idx) === url.substr(0, idx)) {
                    return true;
                }
            }
        }
        return false;
    }

}

export default NavbarItem;