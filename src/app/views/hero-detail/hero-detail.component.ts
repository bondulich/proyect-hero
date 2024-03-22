import { Location, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero = {id:0, name:''};
  public isNew: boolean=true;
  public id: number|null=null;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private loaderService:LoaderService, private location: Location){ }

  ngOnInit(): void {
    this.isNew = this.route.snapshot.paramMap.get('id') === 'new';
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10) ?? null;
    this.getHero();
  }

  getHero(): void {
    if(!this.id) return;
    this.loaderService.showLoader();

    this.heroService.getHero(this.id).subscribe({
      next: res => {
        this.hero = res;
      },
      complete: () => {
        this.loaderService.hideLoader();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSave(){
    if(!this.hero.name.trim()) return;
    this.loaderService.showLoader();

    if(this.isNew){
      this.heroService.addHero(this.hero).subscribe({
        next: () => this.goBack(),
        complete: () => this.loaderService.hideLoader()
      });
    } else {
      this.heroService.updateHero(this.hero).subscribe({
        next: () => this.goBack(),
        complete: () => this.loaderService.hideLoader()
      });
    }
  }
}
