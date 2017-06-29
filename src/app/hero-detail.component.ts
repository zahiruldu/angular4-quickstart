import { Hero } from './hero';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from './hero.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'hero-detail',
  providers:[HeroService],
   templateUrl: './hero-detail.component.html',
//   template: `
//      <div *ngIf="hero">
//       <h2>{{hero.name}} details!</h2>
//       <div><label>id: </label>{{hero.id}}</div>
//       <div>
//         <label>name: </label>
//         <input [(ngModel)]="hero.name" placeholder="name"/>
//       </div>
//     </div>
//   `
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;

    constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
    ) {}

    ngOnInit(): void {
    this.route.params
        .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        .subscribe(hero => this.hero = hero);
    }

    goBack(): void {
    this.location.back();
    }


}