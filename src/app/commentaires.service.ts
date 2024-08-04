import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './article.model';

//on fais appelle à cette url json pour l'utiliser avec notre application
const APIURL='https://jsonplaceholder.typicode.com/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {

  constructor(private http:HttpClient) { }

  getCommentaires (postId:number):Observable<Comment[]>{
    return this.http.get<Comment[]>(`${APIURL}?postId=${postId}`);
  }
}



