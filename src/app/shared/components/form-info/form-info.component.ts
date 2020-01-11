import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-form-info',
	templateUrl: './form-info.component.html',
	styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {

	@Input() hint: string;
	@Input() control: FormControl;
	@Input() errorList: any;

	infoType: string = 'hint';

	constructor() { }

	ngOnInit() {
	}

	hasError() {
		return this.control.touched && this.control.invalid;
	}

	getClasses() {
		return `form-text ${this.hasError() ? 'text-danger' : 'text-muted'}`;
	}

	getValue() {
		if (this.hasError()) {

			return this.getLastError();
		}
		return this.hint;
	}

	getLastError() {
		for (let key in this.control.errors) {
			return this.errorList[key] || '';
		}
	}

}
