import { Component, OnInit } from '@angular/core';
import {RssClass} from "../app.component";
import {NewsRss} from "../news-rss";
import {Router} from "@angular/router";


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  NewRssData?: NewsRss;


  title = 'RSSparser';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.SetData();
    this.InitilizeButton();
  }

  SetData(){
     // @ts-ignore
    this.NewRssData = JSON.parse(localStorage.getItem('RssData'));
  };

  public directing(): void {
    this.router.navigateByUrl('Map');
  };

  InitilizeButton(){

    let button = document.getElementById('button');

    //@ts-ignore
    button.onclick = function () {
      CardsComponent.directing();
    };

  };

}


