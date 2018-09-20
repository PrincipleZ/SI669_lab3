import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;
  byAlpha = true;
  buttonText = "Order Alphabetically";

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }

  onClickSort(): void{
    //Run sort here
    if (this.byAlpha){
        this.heroes.sort(function (a,b){
            let alpha = a.name[0];
            let beta = b.name[0];
            if (alpha > beta) { return 1; }
            else if (alpha === beta) { return 0; }
            else { return -1; }
        });
        this.buttonText = "Order By id";
    } else {
        this.heroes.sort(function (a,b){return a.id - b.id});
        this.buttonText = "Order Alphabetically";
    }
    this.byAlpha = !this.byAlpha;
  }
}

