import {QuestionPage} from "./question-page";

export class Topic {
  public id: any
  public title: any
  public questionPages: QuestionPage[] = []
  public user: any

  constructor() {
  }
}
