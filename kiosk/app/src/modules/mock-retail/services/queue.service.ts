import {Injectable} from '@angular/core';
import {User} from 'app/src/common/interfaces/firebase.interface';
import {Plan} from '../components/plans/plans-mock';
import {FirebaseService} from 'app/src/common/services/firebase.service';

@Injectable()
export class QueueService {
  
  private selectedUser: User;
  private queue: Array<User>;
  private previousPlan: Plan;
  private newPlan: Plan;
  
  constructor(private firebaseService:FirebaseService) {
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
  
  public setPreviousPlan(plan: Plan) {
    this.previousPlan = plan;
  }
  
  public getPreviousPlan(): Plan {
    return this.previousPlan;
  }
  
  public setNewPlan(plan: Plan) {
    this.newPlan = plan;
  }
  
  public getNewPlan(): Plan {
    return this.newPlan;
  }
}
