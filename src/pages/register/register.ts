import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginService} from "../../providers/login.service";
import {WelcomePage} from "../welcome/welcome";
import {TabsPage} from "../tabs/tabs";

@Component({
	selector: 'register',
	templateUrl: 'register.html'
})
export class RegisterPage {

	public email: string;
	public password: string;
	public role: string;
	public exceptionMessage: string;

	constructor(private navController: NavController,
				private loginService: LoginService) {
	}

	public backToWelcome() {
		this.navController.push(WelcomePage)
	}

	public register() {
		this.loginService.newUser(this.email, this.password, this.role).subscribe(response => {
			if (response && response.success) {
				this.loginService.setUser(response.user);
				this.navController.push(TabsPage);
			} else {
				this.exceptionMessage = response.message;
			}
		}, () => {
			this.exceptionMessage = 'Não foi possível realizar o cadastro';
		});
	}
}
