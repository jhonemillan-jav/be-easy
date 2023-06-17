import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'app/_services/auth.service';
import { StorageService } from 'app/_services/storage.service';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})

export class BikeComponent implements OnInit  {
  brand: string = ''
  size: string = ''
  color: string = ''
  registration: string = '';
  sizes = ['26', '27.5', '29'];
  bikes = [];
  newRecord = {
    brand: '',
    size: 0,
    color: ''
  };

  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.getAllBikes();
  }

  records: {
    brand: string,
    size: number,
    color: string
    registration: string;
  }[] = [];

  submitForm(form: NgForm) {
    const user = this.storageService.getUser();
    this.authService.createBike({username: user.username, ...form.value}).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
      }
    });
    this.getAllBikes();
    form.reset();
  }

  getAllBikes() {
    console.log('se llama all bikes')
    const user = this.storageService.getUser();
    this.authService.getAllBikes(user.username).subscribe(bikes => this.records = bikes)
  }



}
