import {Component, OnInit} from '@angular/core';
import * as xml2js from "xml2js";
import {NewsRss} from "./news-rss";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import * as path from "path";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  title = 'RSSparser';


  ngOnInit(): void {
    this.GetRssFeedData();
  }

  constructor(public http: HttpClient,
              private router: Router) {}


  //router redirect dynamic
  public directing(): void {
    this.router.navigateByUrl('Cards');
  }

  GetRssFeedData()  {
    const requestOptions: Object = {
      observe: 'body',
      responseType: 'text'
    };

    const xml_url = "https://earthquakes.bgs.ac.uk/feeds/WorldSeismology.xml";

    this.http.get<any>(xml_url, requestOptions).subscribe((data) => {

      let parseString = xml2js.parseString;

      parseString(data, (err, result: NewsRss) => {

        RssClass.RssData = result;

        localStorage.setItem('RssData',JSON.stringify(RssClass.RssData));

        this.directing();
      });
    });
  }
}

export class RssClass {
  static RssData?: NewsRss;
}


