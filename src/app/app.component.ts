import {Component, OnInit} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import * as xml2js from 'xml2js';
import {NewsRss} from './news-rss';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public RssData?: NewsRss;


  title = 'RSSparser';

  constructor(
    public http: HttpClient
  ) {}

  ngOnInit(): void {
    this.GetRssFeedData(); //content ve view kontrol edilmeden önce yalnızca bir kez çağırılır
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

            this.RssData = result;

          });

          // return this.RssData;

      });
  }

}



