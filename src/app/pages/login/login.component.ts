import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  /**
   * La función verifica si el nombre de usuario y la contraseña ingresados coinciden con las
   * credenciales de administrador y registra un mensaje de éxito si lo hacen; de lo contrario, registra
   * un mensaje de credenciales incorrectas.
   */

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (username === 'admin' && password === 'admin') {
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/home']);
    } else {
      console.log('Credenciales incorrectas');
    }
  }
}
