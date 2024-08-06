import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from '../article.service';
import { Article, Comment } from '../article.model';
import { CommentairesService } from '../commentaires.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  imports: [CommonModule, RouterModule, HttpClientModule, RouterLink]
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleservice: ArticleService,
    private commentairesService: CommentairesService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    if (id) {
      this.articleservice.getArticle(id).subscribe(article => {
        this.article = article;
        console.log('Article loaded:', this.article);
        this.loadComments(id);
      });
    }
  }

  loadComments(postId: number): void {
    this.commentairesService.getCommentaires(postId).subscribe(
      comments => {
        console.log('Comments loaded:', comments);
        this.comments = comments;
      },
      error => {
        console.error('Error loading comments:', error);
      }
      
    );
  }

  deleteArticle(): void {
    if (this.article && this.article.id !== undefined) {
      Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Vous ne pourrez pas annuler cette action!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.articleservice.deleteArticle(this.article!.id!).subscribe(
            () => {
              Swal.fire(
                'Supprimé!',
                'L\'article a été supprimé avec succès.',
                'success'
              ).then(() => {
                this.router.navigate(['/articles']);
              });
            },
            error => {
              console.error('Error deleting article:', error);
              Swal.fire(
                'Erreur',
                'Une erreur est survenue lors de la suppression de l\'article.',
                'error'
              );
            }
          );
        }
      });
    } else {
      Swal.fire(
        'Erreur',
        'L\'article n\'a pas pu être trouvé.',
        'error'
      );
    }
  }
}
