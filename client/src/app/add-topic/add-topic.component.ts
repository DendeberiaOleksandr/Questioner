import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {TopicService} from "../service/topic.service";
import {Topic} from "../model/topic";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestionPage} from "../model/question-page";
import {Question} from "../model/question";
import {Answer} from "../model/answer";
import {take} from "rxjs/operators";
import  { faTrash } from "@fortawesome/free-solid-svg-icons"
import  { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent implements OnInit {

  faTrash = faTrash
  faTimesCircle = faTimesCircle

  isFocused: boolean = false;

  @ViewChild('autosize') private autosize: any;

  currentPage: number;
  formGroup: any;
  topic: Topic;
  urlRegEx =
    'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)';

  constructor(private topicService: TopicService,
              private ngZone: NgZone) {
    //Generating default form data
    this.topic = new Topic()
    this.topic.title = 'Untitled topic'
    let questionPage = new QuestionPage();
    let question = new Question();
    question.answers.push(new Answer())
    questionPage.questions.push(question)
    this.topic.questionPages.push(questionPage)

    //Configuration reactive form
    this.formGroup = new FormGroup({
        title: new FormControl(this.topic.title, Validators.required),
      }
    )

    this.currentPage = 0
  }

  get title() { return this.formGroup.get('title'); }

  ngOnInit(): void {
  }

  titleInputChange(event: any) {
    let title = event.target.value;
    this.topic.title = title;
  }

  buttonAddQuestionClick() {
    let question = new Question()
    question.answers.push(new Answer())
    this.topic.questionPages[this.currentPage].questions.push(question);
  }

  buttonAddAnswerClick(question: Question) {
    question.answers.push(new Answer());
  }

  questionChange(questionIndex: number, event: any) {
    this.topic.questionPages[this.currentPage].questions[questionIndex].title = event.target.value;
  }

  answerChange(questionIndex: number, answerIndex: number, event: any){
    this.topic.questionPages[this.currentPage].questions[questionIndex].answers[answerIndex].text = event.target.value;
  }

  buttonCreateTopicClick(){
    this.topicService.save(this.topic).subscribe(
      res => {

      },
      error => {

      });
  }

  triggerResize(){
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true))
  }

  textAreaFocusOut(){
    this.isFocused = false
  }

  textAreaFocusIn(){
    this.isFocused = true
  }

  deleteQuestionClick(questionIndex: number){
    this.topic.questionPages[this.currentPage].questions.splice(questionIndex, 1)
  }

}
