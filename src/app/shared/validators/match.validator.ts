import { FormControl } from "@angular/forms"

export const matchValidator = (match: string) => {
    return (c: FormControl) => {
        return !c.parent || c.value === c.parent.controls[match].value ? null : { match: false }
    }
}