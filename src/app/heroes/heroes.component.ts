import { Component, OnInit } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { NgFor, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [UpperCasePipe, NgFor, FormsModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  public heroes:Hero[] = [];

  constructor(private heroService: HeroService){ }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }
}
