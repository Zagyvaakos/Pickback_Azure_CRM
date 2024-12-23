import { Component, inject, signal, viewChild } from '@angular/core';
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
export class LoginComponent {
  readonly store = inject(AuthStore);
  readonly ngForm = viewChild(NgForm);

  public loginData = signal<LoginData>({
    email: '',
    password: '',
  });
  public stupid = signal<boolean>(false);

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

  /** */
  onLogin(): void {
    console.log(this.loginData())
    if (this.ngForm()?.invalid) {
      // markAllAsTouched(this.ngForm());
      return;
    }
    this.store.login(this.loginData());
  }
}
