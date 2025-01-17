import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName!: string;
  password!: string;
  showPassword: boolean = false;


  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

  async onSubmit() {
    
    const token = await this.userService.login(this.userName, this.password);
    if (token) {
      //Store token in local storage
      localStorage.setItem('userName', this.userName.toString());
      localStorage.setItem('token', token);
      //Redirect to protected component
      this.router.navigate(['/home']);
      console.log('Login successful for user:', this.userName);
      this.toastr.success('We are so hap-pea to see you', this.userName, {
        positionClass: 'toast-bottom-right'
      });
    } else {
      //toastr in the bottom right corner
      this.toastr.warning('Holy guacemoly, you have entered an invalid username or password!', '', {
        positionClass: 'toast-bottom-right'
      });
    }

    //console.log('Login successful for user:', this.userName);
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  //   const passwordInput = document.getElementById('password');
  //   const toggleIcon = document.querySelector('.toggle-password');
  //   if (passwordInput.type === 'password') {
  //     passwordInput.type = 'text';
  //     toggleIcon.classList.remove('fa-eye');
  //     toggleIcon.classList.add('fa-eye-slash');
  //   } else {
  //     passwordInput.type = 'password';
  //     toggleIcon.classList.remove('fa-eye-slash');
  //     toggleIcon.classList.add('fa-eye');
  //   }
  // }
  
// logout method
	// logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userName');
  //   console.log('Logged out successfully');
  //   this.toastr.success('Donut pho-get about us, we will miss you', '', {
  //     positionClass: 'toast-bottom-right'
  //   });
  //   }

  }
}