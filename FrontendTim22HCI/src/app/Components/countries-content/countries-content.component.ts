import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Country } from 'src/app/Model/Country';
import { CountryService } from 'src/app/service/country.service';


@Component({
  selector: 'app-countries-content',
  templateUrl: './countries-content.component.html',
  styleUrls: ['./countries-content.component.css']
})

export class CountriesContentComponent implements OnInit{
  countries: Country[] = [];

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void{
    localStorage.removeItem('countryDetails');
    this.countryService.getAllCountries().subscribe((data: any) => {
      data.forEach((element: any) => {
        let country: Country = this.countryService.parseToCountry(element);
        this.countries.push(country);
      });
    });
  }

  chooseCountry(name: string){
    localStorage.setItem('countryDetails', name);
    this.router.navigate(['country']);
  }

}
