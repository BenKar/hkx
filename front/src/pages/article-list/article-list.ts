import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {ArticleService} from '../../providers/article-service-rest';
import {ArticleDetailPage} from '../article-detail/article-detail';
import {SERVER_URL} from '../../providers/config';


@Component({
    selector: 'page-article-list',
    templateUrl: 'article-list.html'
})
export class ArticleListPage {

    articles: Array<any>;
    articlesForSearch: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;
    serverUrl = SERVER_URL;

    constructor(public navCtrl: NavController, public service: ArticleService, public config: Config) {
        this.findAll();
    }

    openArticleDetail(article: any) {
        this.navCtrl.push(ArticleDetailPage, article);
    }

    onInput(event) {
         // Reset items back to all of the items
        this.articles = this.articlesForSearch;

        // set val to the value of the searchbar
        let val = this.searchKey;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.articles = this.articles.filter((article) => {
            return (article.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
    }

    onCancel(event) {
        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .then(data => {
                console.log("data", data);
                this.articles = data.sort((article1, article2) => (new Date(article1.createdAt)).getTime() < (new Date(article2.createdAt)).getTime());
                this.articlesForSearch = data;
                console.log(this.articles);
            })
            .catch(error => alert(error));
    }
}
