import {Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ArticleService} from "../../providers/article-service-rest";
import {ArticleListPage} from '../article-list/article-list';
@Component({
    selector: 'article-post',
    templateUrl: 'article-post.html'
})
export class ArticlePostPage {

    constructor(public navCtrl: NavController, public service: ArticleService) {
    }

    article = {}
    
    submitForm() {
        this.service
            .create(this.article)
            .then(() => this.navCtrl.push(ArticleListPage));
    }
}