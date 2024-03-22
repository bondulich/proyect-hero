import { Location, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, NgIf],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero = {id:0, name:''};
  public id: number|false = false;
  public formHero = new FormGroup({
    id: new FormControl({value: 0, disabled: true} ),
    name: new FormControl('', [ Validators.required ]),
  });

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location){ }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10) ?? false;
    this.getHero();
  }

  getHero(): void {
    if(!this.id) return;

    this.heroService.getHero(this.id).subscribe({
      next: res => {
        this.hero = res;
        this.formHero.setValue({id: res.id, name: res.name});
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSave(){
    if(!this.formHero.valid) return;
    
    if(this.id){
      const updatedHero = this.formHero.getRawValue();
      this.heroService.updateHero(updatedHero as Hero).subscribe({
        next: () => this.goBack()
      });
    } else {
      this.heroService.addHero({ name:this.formHero.value.name } as Hero).subscribe({
        next: () => this.goBack()
      });
    }
  }
}
