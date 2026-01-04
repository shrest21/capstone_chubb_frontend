import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private storageService:StorageService){}
  user=this.storageService.getUser();
}
