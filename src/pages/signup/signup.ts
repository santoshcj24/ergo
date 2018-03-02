import { HttpClient,HttpHeaders, HttpClientModule } from '@angular/common/http';


import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validators';




import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string,organisation: string,users_no: string,to_date: string, is_demo: boolean,license_type: string,phone: string,password: string,
designation: string} = {
    name: '',
    email: '',
    // email: '',
    organisation: '',
    users_no: '',
    to_date: '',
    is_demo: false,
    license_type: '',
    phone: '',
    password: '',
     designation: '',
    // password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;

 credentialsForm: FormGroup;

  constructor(public navCtrl: NavController,
    public user: User,
    private http: HttpClient,
    public toastCtrl: ToastController,
     public formBuilder: FormBuilder,
    
    ) {
    this.credentialsForm = this.formBuilder.group({
      email: [
   '', Validators.compose([
     Validators.pattern(regexValidators.email),
     Validators.required
   ])
 ],
 name: [
   '', Validators.compose([
     /*Validators.pattern(regexValidators.name),*/
     Validators.required
   ])
 ],
 password: [
   '', Validators.compose([
     // Validators.pattern(regexValidators.password),
     Validators.required
   ])
 ],
  organisation: [
   '', Validators.compose([
     // Validators.pattern(regexValidators.password),
     Validators.required
   ])
 ],
  users_no: [
   '', Validators.compose([
     // Validators.pattern(regexValidators.password),
     Validators.required
   ])
 ],
  phone: [
   '', Validators.compose([
      Validators.pattern(regexValidators.phone),
     Validators.required
   ])
 ],
  designation: [
   '', Validators.compose([
     // Validators.pattern(regexValidators.password),
     Validators.required
   ])
 ],

    });
    
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  onSignIn() {
    // Attempt to login in through our User service
     // var link = '192.168.1.7/api/signup';

    //     this.http.post('/api/signup', {account:this.account}).subscribe(response => {
    // return console.log(JSON.stringify(response)); });

if (this.credentialsForm.valid) {
   

    this.http.post('http://localhost:8000/api/signup/', this.credentialsForm.value).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      // this.navCtrl.push(MainPage);
      this.signupErrorString='Unable to connect to server. Please Check your internet connection';
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

  }
  }
}
