import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { InputPasswordComponent } from '../../../../@shared/input/ui/input-password/input-password.component';
import { FormsModule, NgForm } from '@angular/forms';
// import { InputComponent } from '../../../../@shared/input/ui/input/input.component';
import { AuthStore } from '../../data-access/auth.store';
import { LoginData } from '../../models/login-data';
// import { markAllAsTouched } from '../../../../@core/utils/markAllAsTouched';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { debounce, debounceTime, delay } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,

  imports: [
    FormsModule,
    InputTextModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    // InputComponent,
    // InputPasswordComponent,
  ],
  providers: [AuthStore],
})
export class LoginComponent implements OnInit {
  readonly store = inject(AuthStore);
  readonly ngForm = viewChild(NgForm);

  public loginData = signal<LoginData>({
    email: '',
    password: '',
  });
  public stupid = signal<boolean>(false);

  // rememberMe = false;


  ngOnInit(): void {

    // const savedEmail = localStorage.getItem('email');
    // const savedPassword = localStorage.getItem('password');

    // if (savedEmail && savedPassword) {
    //   this.loginData.set({ email: savedEmail, password: savedPassword });
    //   this.rememberMe = true;
    // }
  }

  /**
   *
   * @param key
   * @param value
   */
  onLoginDataChange(key: keyof LoginData, value: string | null | undefined) {
    this.loginData.set({
      ...this.loginData(),
      [key]: value,
    });
  }

  onStupid() {
    this.stupid.set(!this.stupid());
    console.log(this.stupid())

  }
  loading: boolean = false;


  onLogin(): void {
    if (this.loading) return;
    this.loading = true;
    console.log(this.loginData())
    if (this.ngForm()?.invalid) {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      return;
    }
    this.store.login(this.loginData());
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    // if (this.rememberMe) {
    //   localStorage.setItem('email', this.loginData().email);
    //   localStorage.setItem('password', this.loginData().password); // Avoid storing plaintext in real apps
    // }
  }
}
