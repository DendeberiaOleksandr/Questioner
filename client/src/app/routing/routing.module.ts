import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AddTopicComponent} from "../add-topic/add-topic.component";
import {HomeComponent} from "../home/home.component";
import {TopicComponent} from "../topic/topic.component";
import {AuthGuard} from "../guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      roles: []
    }
  },
  {
    path: 'topics',
    component: TopicComponent,
    canActivate: [AuthGuard],
    data: {
      roles: []
    },
    children: [
      {
        path: 'add',
        component: AddTopicComponent,
        canActivate: [AuthGuard],
        data: {
          roles: []
        }
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
