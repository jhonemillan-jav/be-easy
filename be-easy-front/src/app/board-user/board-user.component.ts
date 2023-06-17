import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import * as Leaflet from 'leaflet'; 
import { AuthService } from 'app/_services/auth.service';
import { StorageService } from 'app/_services/storage.service';
import { IBodyUserInfo } from 'app/_services/types';
import { ROLES, getEnumValueRole, variabilityConfig } from 'app/_helpers/utils';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  enableAdditionalData = false;
  formData: IBodyUserInfo = {
    name: '',
    lastname: '',
    birthday: '',
    height: 0,
    weight: 0
  };

  constructor(private authService: AuthService, private storageService: StorageService) {}

  submitForm(): void {
    console.log(this.formData);
    if (this.isFormValid()) {
      const user = this.storageService.getUser();
      this.authService.createUserInfo(this.formData, user.username).subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {
        }
      });
    }
  }

  getUserInfo() {
    const user = this.storageService.getUser();
    this.authService.getUserInfo(user.username).subscribe(info => {
      if (info) {
        this.formData = info;
      } else {
        console.log('No user info available');
      }
    });
  }

  isFormValid(): boolean {
    // Perform any form validation here
    // Return true if the form is valid, false otherwise
    return true; // Placeholder validation, modify as needed
  }

  enableAdditional() {
		const user = this.storageService.getUser();
		console.log(user);

		const role = getEnumValueRole(user.roles[0]);
		const config = variabilityConfig[role as ROLES]
		this.enableAdditionalData = !config.additionalData;
	}


  
  ngOnInit(): void {
    this.getUserInfo();
    this.enableAdditional();
  }




}
