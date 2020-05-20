import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() duration: number;
  @Output() endOfTime: EventEmitter<any> = new EventEmitter<any>();
  stroke: number;
  timerValue: string;
  running = false;

  constructor() { }

  ngOnInit() {
    this.timerValue = this.getTimerValue(this.duration * 60);

  }

  start() {
    if (this.running) {
      return;
    }

    setTimeout(() => {
      this.running = true;

      const timeTotal = this.duration * 60; /* how long the timer will run (seconds) */
      const initialOffset = 440;
      let fillIndex = 1;

      /* Need initial run as interval hasn't yet occured... */
      this.stroke = initialOffset - (1 * (initialOffset / timeTotal));
      this.timerValue = this.getTimerValue(timeTotal - fillIndex);

      const interval = setInterval(() => {
        this.timerValue = this.getTimerValue(timeTotal - fillIndex);

        if (fillIndex === timeTotal) {
          clearInterval(interval);
          this.running = false;
          this.endOfTime.emit();
          return;
        }

        this.stroke = initialOffset - ((fillIndex + 1) * (initialOffset / timeTotal));

        fillIndex++;
      }, 1000);

    }, 0);
  }

  private getTimerValue(time: number): string {
    const minutes = this.getMinutes(time);
    const seconds = this.getSeconds(time);

    return `${minutes}:${seconds}`;
  }

  private getMinutes(time: number): string {
    const minutes = Math.floor(time / 60);
    return `0${minutes}`.slice(-2);
  }

  private getSeconds(time: number): string {
    const seconds = time % 60;
    return `0${seconds}`.slice(-2);
  }
}
