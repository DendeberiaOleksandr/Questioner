import { Component, OnInit } from '@angular/core';
import {TopicService} from "../service/topic.service";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topics: any;

  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.topicService.getTopics().subscribe(t => this.topics = t)
  }

}
