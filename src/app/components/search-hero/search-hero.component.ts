import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-search-hero',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './search-hero.component.html',
  styleUrl: './search-hero.component.css'
})
export class SearchHeroComponent implements OnInit {
  @Output() textSearch = new EventEmitter<string>();
  private searchTerms = new Subject<string>();
  
  constructor(){ }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(res => res),
    ).subscribe(term => {
      this.textSearch.emit(term);
    });
  }

  search(term:string): void {
    this.searchTerms.next(term);
  }
}
