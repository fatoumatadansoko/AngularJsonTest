import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';
import { ArticleFormComponent } from '../articles-form/articles-form.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from "../app.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [RouterModule, ArticleFormComponent, CommonModule, HttpClientModule, AppComponent,ReactiveFormsModule],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.scss'
})
export class ArticlesListComponent {
  articles: Article[] = []; // Définir la propriété articles

  constructor(private articleservice: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleservice.getArticles().subscribe(data => {
      this.articles = data;
    });
  }
}



