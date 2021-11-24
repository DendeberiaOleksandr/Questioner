import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Topic} from "../model/topic";
import {HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private resource_url = 'http://localhost:8081/topics';

  constructor(private http: HttpClient) { }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.resource_url);
  }

  save(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(this.resource_url, topic)
  }

}
