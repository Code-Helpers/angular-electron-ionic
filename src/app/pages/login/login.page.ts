import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ToastController, NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;
  public showPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private menuCtrl: MenuController,
    private toastController: ToastController,
    private navCtrl: NavController,
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  async onSubmit() {
    if (this.form.valid) {
      const loading = await this.loadingController.create({
        message: 'Carregando...',
        duration: 2000
      });
      await loading.present();
      const { ...user } = this.form.value;

      setTimeout(() => {
        loading.dismiss();
        this.presentToast('Desculpe, usuário não registrado!');
      }, 2000);
    }
  }
}
