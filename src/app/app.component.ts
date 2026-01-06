import { Component, OnInit } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showWarehouseBoard = false;
  showFinanceBoard=false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.role || [];

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showWarehouseBoard = this.roles.includes('ROLE_WAREHOUSE_MANAGER');
      this.showFinanceBoard=this.roles.includes('ROLE_FINANCE_OFFICER');
      this.username = user.name || user.email;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log('Logout successful:', res);
        this.storageService.clean();
        
        this.isLoggedIn = false;
        this.username = undefined;
        
        this.router.navigate(['/login']);
        window.location.reload();
      },
      error: err => {
        console.log('Logout error:', err);
        this.storageService.clean();
        window.location.reload();
        this.router.navigate(['/login']);
      }
    });
  }
}