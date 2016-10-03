import {rand, hitTest} from '../helpers/helpers';
import {MASTER} from '../helpers/master';
import {Coord} from '../interfaces/fireworks.interface';

export class Particle {
  
  private x: number;
  private y: number;
  private coordLast: Array<Coord>;
  private angle: number;
  private speed: number;
  private friction: number;
  private gravity: number;
  private hue: number;
  private brightness: number;
  private alpha: number;
  private decay: number;
  private wind: number;
  private lineWidth: number;
  private radius: number;
  
  constructor(x: number, y: number, hue: number) {
    this.x = x;
    this.y = y;
    this.coordLast = [
      {x: x, y: y},
      {x: x, y: y},
      {x: x, y: y}
    ];
    this.radius = 1;
    this.angle = rand(0, 360);
    this.speed = rand(((
      MASTER.partSpeed - MASTER.partSpeedVariance) <= 0) ? 1 : MASTER.partSpeed - MASTER.partSpeedVariance,
      (MASTER.partSpeed + MASTER.partSpeedVariance));
    this.friction = 1 - MASTER.partFriction / 100;
    this.gravity = MASTER.partGravity / 2;
    this.hue = rand(hue - MASTER.hueVariance, hue + MASTER.hueVariance);
    this.brightness = rand(50, 80);
    this.alpha = rand(40, 100) / 100;
    this.decay = rand(10, 50) / 1000;
    this.wind = (rand(0, MASTER.partWind) - (MASTER.partWind / 2)) / 25;
    this.lineWidth = MASTER.lineWidth;
    
  }
  
  public update(): boolean {
    let radians: number = this.angle * Math.PI / 180;
    let vx: number = Math.cos(radians) * this.speed;
    let vy: number = Math.sin(radians) * this.speed + this.gravity;
    this.speed *= this.friction;
    
    this.coordLast[2].x = this.coordLast[1].x;
    this.coordLast[2].y = this.coordLast[1].y;
    this.coordLast[1].x = this.coordLast[0].x;
    this.coordLast[1].y = this.coordLast[0].y;
    this.coordLast[0].x = this.x;
    this.coordLast[0].y = this.y;
    
    this.x += vx * MASTER.dt;
    this.y += vy * MASTER.dt;
    
    this.angle += this.wind;
    this.alpha -= this.decay;
    
    if (!hitTest(0, 0, MASTER.cw, MASTER.ch, this.x - this.radius, this.y - this.radius,
        this.radius * 2, this.radius * 2)) {
      return true;
    } else if (this.alpha < .05) {
      return true;
    } else {
      return false;
    }
    
  }
  
  public draw(ctx: CanvasRenderingContext2D): CanvasRenderingContext2D {
    let coordRand: number = (rand(1, 3) - 1);
    ctx.beginPath();
    ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y));
    ctx.lineTo(Math.round(this.x), Math.round(this.y));
    ctx.closePath();
    ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
    ctx.stroke();
    
    if (MASTER.flickerDensity > 0) {
      let inverseDensity: number = 50 - MASTER.flickerDensity;
      if (rand(0, inverseDensity) === inverseDensity) {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), rand(this.lineWidth, this.lineWidth + 3) / 2,
          0, Math.PI * 2, false);
        ctx.closePath();
        let randAlpha: number = rand(50, 100) / 100;
        ctx.fillStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + randAlpha + ')';
        ctx.fill();
      }
    }
    return ctx;
  }
}
