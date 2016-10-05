import {Injectable} from '@angular/core';
import {User} from '../classes/users';
import {MockUsers} from '../classes/users-mock';
import {Plan} from '../components/plans/plans-mock';

@Injectable()
export class QueueService {
  
  private selectedUser:User;
  private queue:Array<User>;
  private previousPlan:Plan;
  private newPlan:Plan;
  
  constructor() {
    this.queue = MockUsers;
  }
  
  public setUser(user:User):void {
    this.selectedUser = user;
    this.setPreviousPlan(user.plan);
  }
  
  public getUser():User {
    if (!this.selectedUser) {
      return this.queue[0];
    } else {
      return this.selectedUser;
    }
  }
  
  public getQueue():Array<User> {
    return this.queue;
  }
  
  public setPreviousPlan(plan:Plan) {
    this.previousPlan = plan;
  }
  
  public getPreviousPlan():Plan {
    return this.previousPlan;
  }
  
  public setNewPlan(plan:Plan) {
    this.newPlan = plan;
  }
  
  public getNewPlan():Plan {
    return this.newPlan;
  }
}
