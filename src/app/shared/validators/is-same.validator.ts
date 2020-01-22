import { FormControl } from "@angular/forms"

export const isSameValidator = (match: string) => {
    return (c: FormControl) => {
        if(match === c.value) {
            return null;
        }

        return {
            isSame: {
                valid: false
            }
        }
    }
}