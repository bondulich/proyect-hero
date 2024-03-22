import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { AsyncPipe, NgIf } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [NgIf, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  constructor(public loader: LoaderService){}
}
