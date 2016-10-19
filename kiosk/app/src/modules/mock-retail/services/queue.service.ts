import { Injectable } from '@angular/core';
import { User } from 'app/src/common/interfaces/firebase.interface';
import { PLAN } from '../components/plans/plans-mock';
import { FirebaseService } from 'app/src/common/services/firebase.service';

@Injectable()
export class QueueService {

  private selectedUser: User;
  private queue: Array<User>;
  private previousPlan: PLAN;
  private newPlan: PLAN;

  constructor(private firebaseService: FirebaseService) {
  }

  public setUser(user: User): void {
    this.selectedUser = user;
    this.setPreviousPlan(user.plan);
  }

  public getUser(): User {
    if (!this.selectedUser) {
      return this.getQueue()[0];
    } else {
      return this.selectedUser;
    }
  }

  public getQueue(): Array<User> {
    return this.firebaseService.getQueue();
  }

  public setPreviousPlan(plan: PLAN) {
    this.previousPlan = plan;
  }

  public getPreviousPlan(): PLAN {
    return this.previousPlan;
  }

  public setNewPlan(plan: PLAN) {
    this.newPlan = plan;
  }

  public getNewPlan(): PLAN {
    return this.newPlan;
  }
}
