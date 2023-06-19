export interface NewsRss {
  rss: RssObject;
}

export interface RssObject {
  channel: Array<RssChannel>;
}

export interface RssChannel {
  title: Array<string>;
  description: Array<string>;
  image: Array<RssImage>;
  item: Array<RssItem>;
  language: Array<string>;
  lastBuildDate: Date;
  link: Array<string>;

}

export interface RssImage {
  link: Array<string>;
  title: Array<string>;
  url: Array<string>;
}

export interface RssItem {
  title: Array<string>;
  category: Array<string>;
  description: Array<string>;
  link: Array<string>;
  pubDate: Date;
  'geo:lat' : Array<number>;
  'geo:long': Array<number>;

}


