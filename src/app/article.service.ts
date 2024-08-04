import { HttpClient } from '@angular/common/http';
import { Article } from './article.model';
import { Observable, map, of } from 'rxjs';
import { Injectable } from '@angular/core';



//on fais appelle à cette url json pour l'utiliser avec notre application
const APIURL='https://jsonplaceholder.typicode.com/posts';


@Injectable({
  providedIn: 'root'
})

//sa vient avec la classe pour l'utilisation externe dans d'autres fichiers
export class ArticleService {

  //on déclare cette variables articles avec type article qu'on avait créer au niveau de otre model 
private articles:Article[]=[];
  constructor(private http:HttpClient) { }

  //on fetch pour faire le link entre les articles du json avec nos articles

  fetchArticle(): Observable <Article[]>{
    return this.http.get<Article[]>(APIURL).pipe(
      map((data:Article[])=>{this.articles = data;
        return this.articles;
      })
    )
  }

  //methode de récupération des articles
  getArticles (): Observable<Article[]> {
    if(this.articles.length>0) {
      return of(this.articles);
    }
    else{
      return this.fetchArticle();
    }
  }

  //méthode d'ajout d'article
  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(APIURL, article).pipe(
      map(newArticle => {
        if(newArticle){
          this.articles.push(newArticle);
        }
        return newArticle;
      }),
    );
  }
  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${APIURL}/${id}`, article).pipe(
    );
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${APIURL}/${id}`).pipe(
      // catchError(this.handleError)
    );
  }

  //méthode d'affichage des articles en fonction de l'id recupérer
  getArticle(id:number):Observable<Article> {
    const article=this.articles.find(article=>article.id===id);
    if(article){
      return of(article);
    }
    else {
      return this.http.get<Article>(`${APIURL}/${id}`).pipe(
        map(data=>{
          if(data){
            this.articles.push(data);
          }
          return data;
        })
      )
    }
  }
}
