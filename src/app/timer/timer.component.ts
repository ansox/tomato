import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  stroke: number;
  timerValue: number;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      const time = 20; /* how long the timer will run (seconds) */
      const initialOffset = 440;
      let i = 1;

      /* Need initial run as interval hasn't yet occured... */
      this.stroke = initialOffset - (1 * (initialOffset / time));

      const interval = setInterval(() => {
        this.timerValue = i;
        if (i === time) {
          clearInterval(interval);
          return;
        }

        this.stroke = initialOffset - ((i + 1) * (initialOffset / time));

        i++;
      }, 1000);

    }, 0);
  }

}
