import { HttpClient,HttpHeaders, HttpClientModule ,HttpParams} from '@angular/common/http';

import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { regexValidators } from '../validators/validators';


// import { LoggerService } from '../../services/log4ts/logger.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
 credentialsForm: FormGroup;
  private signupErrorString: string;
 account: { name: string, email: string,organisation: string,users_no: string,phone: string,password: string,
designation: string} = {
    name: '',
    email: '',
    // email: '',
    organisation: '',
    users_no: '',
   
    phone: '',
    password: '',
     designation: '',
    // password: 'test'
  };

  constructor(public navCtrl: NavController,
    public user: User,
     public http: HttpClient,
    
    public toastCtrl: ToastController,
   public formBuilder: FormBuilder,
             ) {
  	 this.credentialsForm = this.formBuilder.group({
      email: [
   'kashef@kashef.kashef', Validators.compose([
     Validators.pattern(regexValidators.email),
     Validators.required
   ])
 ],
 password: [
   'kashef', Validators.compose([
     // Validators.pattern(regexValidators.password),
     Validators.required
   ])
 ],
  organisation: [
   'kashef', Validators.compose([
     // Validators.pattern(regexValidators.password),
     Validators.required
   ])
 ],
  users_no: [
   '12', Validators.compose([
     // Validators.pattern(regexValidators.password),
     Validators.required
   ])
 ],
  phone: [
   '8147235600', Validators.compose([
      Validators.pattern(regexValidators.phone),
     Validators.required
   ])
 ],
  designation: [
   'kashef', Validators.compose([
     // Validators.pattern(regexValidators.password),
     Validators.required
   ])
 ],

    });
  	 
  }
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad RegisterPage');
  // }
   onSignIn() {
    // this.logger.info('RegisterPage: onSignIn()');
      if (this.credentialsForm.valid) {



      	this.http.post('api/signup',{kashef:'kashef'});

    console.log(this.credentialsForm.value);

    let toast = this.toastCtrl.create({
        message: 'Successful Sign Up',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    // this.navCtrl.push(MainPage);
    // console.log(this.http.get('police/police'));
	}else{
		console.log("error");
		this.navCtrl.push(MainPage);
		 let toast = this.toastCtrl.create({
        message: 'Error Signing Up',
        duration: 3000,
        position: 'top'
      });
      toast.present();
	}
  }

  onForgotPassword() {
    // this.logger.info('RegisterPage: onForgotPassword()');
    console.log("pass");

  }

}
