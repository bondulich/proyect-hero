import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../interfaces/hero';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  public hero: Hero = {
    id:1,
    name: ''
  };
}
