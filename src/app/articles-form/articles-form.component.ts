import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../article.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articles-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './articles-form.component.html',
  styleUrls: ['./articles-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  articleForm: FormGroup;
  articleId?: number | null = null;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articleservice: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params['id'];
    if (this.articleId) {
      this.isEditing = true;
      this.articleservice.getArticle(this.articleId).subscribe(data => {
        if (data) {
          this.articleForm.patchValue(data);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const article: Article = this.articleForm.value;
      if (this.isEditing && this.articleId) {
        this.articleservice.updateArticle(this.articleId, this.articleForm.value).subscribe(() => {
          Swal.fire({
            title: 'Succès',
            text: 'Article modifié avec succès!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/articles']);
          });
        });
      } else {
        this.articleservice.createArticle(article).subscribe(newArticle => {
          Swal.fire({
            title: 'Succès',
            text: 'Article créé avec succès!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.articleForm.reset();
          });
        });
      }
    }
  }
}
