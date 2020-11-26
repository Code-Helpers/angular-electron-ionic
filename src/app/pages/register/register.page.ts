import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public form: FormGroup;
  public showPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private menuCtrl: MenuController,
    private router: Router,
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const loading = await this.loadingController.create({
        message: 'Carregando...',
        duration: 2000
      });
      await loading.present();
      const { confirm, ...user } = this.form.value;

      //Insert user to DB
      setTimeout(() => {
        loading.dismiss();
        this.router.navigate(['/login']);
      }, 2000);
    }
  }
}
