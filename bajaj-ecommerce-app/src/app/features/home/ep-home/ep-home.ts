import { Component } from '@angular/core';
import { Slider } from '../../../shared/components/slider/slider';
import { Banner } from '../../../shared/components/banner/banner';

@Component({
  selector: 'app-ep-home',
  imports: [Slider, Banner],
  templateUrl: './ep-home.html',
  styleUrl: './ep-home.css',
})
export class EpHome {

}
