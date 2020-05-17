import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  weather = [];

  constructor(private http:HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost/meteo-laravel-vue/Meteo/public/api/Angers,FR')
      .subscribe(data => (this.weather = JSON.parse(JSON.stringify(data)).weather));
  }

  onKey(event){
    if(event.target.value!=""){
      this.http.get('http://localhost/meteo-laravel-vue/Meteo/public/api/'+event.target.value)
      .subscribe(data => (this.weather = JSON.parse(JSON.stringify(data)).weather));
    }
  }

  locate(){
    if ("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(function(position){
        console.log(position.coords.latitude+","+ position.coords.longitude);
        this.http.get('http://localhost/meteo-laravel-vue/Meteo/public/api/'+position.coords.latitude+'/'+position.coords.longitude)
      .subscribe(data => (this.weather = JSON.parse(JSON.stringify(data)).weather));
          });
    }else{
        console.log("Browser doesn't support geolocation!");
    }
  }

}
