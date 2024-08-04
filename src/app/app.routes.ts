import { Routes } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleFormComponent } from './articles-form/articles-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' }, // Redirige vers la liste des articles par défaut
  { path: 'articles', component: ArticlesListComponent }, // Route pour la liste des articles
  { path: 'article/new', component: ArticleFormComponent }, // Route pour ajouter un nouvel article
  { path: 'article/:id', component: ArticleDetailComponent }, // Route pour afficher les détails d'un article
  { path: 'articles/:id', component: ArticleFormComponent } // Route pour modifier un article existant
];
