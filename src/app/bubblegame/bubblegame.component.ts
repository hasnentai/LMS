import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, interval, timer} from 'rxjs';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-bubblegame',
  templateUrl: './bubblegame.component.html',
  styleUrls: ['./bubblegame.component.css']
})
export class BubblegameComponent implements OnInit {
  quesions = [
    {
      name: 'Gross Sales',
      type: 'pl'
    },
    {
      name: 'Adjusted Number of shares',
      type: 'bs'
    },
    {
      name: 'Admin Expenses',
      type: 'pl'
    },
    {
      name: 'Income Tax',
      type: 'pl'
    },
    {
      name: 'Excise duty',
      type: 'pl'
    },
    {
      name: 'Book value',
      type: 'bs'
    },
    {
      name: 'Other current assets',
      type: 'bs'
    },
    {
      name: 'Raw material',
      type: 'pl'
    },
    {
      name: 'Finished goods',
      type: 'pl'
    },
    {
      name: 'Contingent liabilities',
      type: 'bs'
    },
    {
      name: 'Deferred tax assets',
      type: 'bs'
    },
    {
      name: 'Manufacturing expenses',
      type: 'pl'
    },
    {
      name: 'Long term borrowings',
      type: 'bs'
    },
    {
      name: 'Personnel Expenses',
      type: 'pl'
    },
    {
      name: 'Provisions',
      type: 'bs'
    },
    {
      name: 'Administrative expenses',
      type: 'pl'
    },
    {
      name: 'Selling and distribution expenses',
      type: 'pl'
    },

    {
      name: 'EBITDA',
      type: 'pl'
    },
    {
      name: 'Depreciation',
      type: 'pl'
    },
    {
      name: 'Interest',
      type: 'pl'
    },

    {
      name: 'Profit before tax',
      type: 'pl'
    },
    {
      name: 'Deferred tax',
      type: 'pl'
    },
    {
      name: 'Other Tax',
      type: 'pl'
    },
    {
      name: 'Investment fluctuation reserves',
      type: 'bs'
    },
    {
      name: 'Equity Share warrents',
      type: 'bs'
    },
    {
      name: 'Exceptional items',
      type: 'pl'
    },

    {
      name: 'Earning before Tax',
      type: 'pl'
    },

    {
      name: 'Operating profit',
      type: 'pl'
    },
    {
      name: 'Cost of material consumes',
      type: 'pl'
    },
    {
      name: 'Total current liabilities',
      type: 'bs'
    },
    {
      name: 'Net current assets',
      type: 'bs'
    },
    {
      name: 'Finance cost',
      type: 'pl'
    },
    {
      name: 'Bank charges',
      type: 'pl'
    },
    {
      name: 'Extra-ordinary income',
      type: 'pl'
    },
    {
      name: 'Share capital',
      type: 'bs'
    },
    {
      name: 'Preference share capital',
      type: 'bs'
    },
    {
      name: 'Employee expenses',
      type: 'pl'
    },
    {
      name: 'Warrent money appropriated',
      type: 'bs'
    },
    {
      name: 'Dividend per share',
      type: 'pl'
    },
    {
      name: 'Power & fuel expenses',
      type: 'pl'
    },
    {
      name: 'Researves & surplus',
      type: 'bs'
    },
    {
      name: 'Securities Premium',
      type: 'bs'
    },
    {
      name: 'Share of associates',
      type: 'pl'
    },
    {
      name: 'Equity dividend',
      type: 'pl'
    },
    {
      name: 'Dividend tax',
      type: 'pl'
    },
    {
      name: 'Capital Reserves',
      type: 'bs'
    },
    {
      name: 'General Reserves',
      type: 'bs'
    },

    {
      name: 'Equity application money',
      type: 'bs'
    },
    {
      name: 'Total shareholders fund',
      type: 'bs'
    },
    {
      name: 'Total debt',
      type: 'bs'
    },
    {
      name: 'Monority interest',
      type: 'bs'
    },
    {
      name: 'Capital work in progress',
      type: 'bs'
    },
    {
      name: 'Total fixed assets',
      type: 'bs'
    },
    {
      name: 'Investments',
      type: 'bs'
    },

    {
      name: 'Total current assets',
      type: 'bs'
    },
    {
      name: 'Total Expenses',
      type: 'pl'
    },
    {
      name: 'Inventory',
      type: 'bs'
    },
    {
      name: 'Debtors',
      type: 'bs'
    },
    {
      name: 'Deferred tax liabilities',
      type: 'bs'
    },
    {
      name: 'Short term borrowings',
      type: 'bs'
    }
  ];
  counter = 1;
  subject = new Subject();
  countDownValue = 5;
  test;
  i = 0;
  totalQuestions;
  option = ['Option1', 'Option2', 'Option3', 'Option4', 'Option5', 'Option6'];
  answer;
  missed = false ;
  timer;
  display = true;
  vall = 100;
  per;
  dis = false;
  correct = false;
  wrong = false;
  shots_pending = 0;
  shots_missed = 0;
  right_hits = 0;
  wrong_hits = 0;
  current_score = 0;
  count = 0;
  secondPage = false;
  current_ques = 0;
  total_ques;
  score = 0;
  answered = false;

  ngOnInit() {
    const numbers = timer(1000, 1000);
    numbers.pipe(takeUntil(this.subject)).subscribe( x => {
      console.log(x);
    });
  }


  quizPage() {
    // this.getData.moduleID = 6;
    localStorage.setItem('moduleID', '6');
    this.router.navigate(['/quiz']);
  }
  constructor(public router: Router) {
    this.quesions = this.quesions.sort(function() { return 0.5 - Math.random(); }).slice(0, 20);
    this.shots_pending = this.quesions.length + 1;
    this.count = this.quesions.length;
    this.total_ques = this.quesions.length;
    this.testing();
  }
  timerFunction() {
    this.timer = timer(1000 , 1000);
    this.timer = this.timer.pipe(takeUntil(this.subject)).subscribe( x => {
      if (x <= this.countDownValue) {
              this.counter = this.countDownValue - x;
              this.per = this.vall - 20;
            } else {
              this.missed = true;
              this.dis = true;
              this.subject.next();
              setTimeout(() => {
               this.missed = false;
               this.dis = false;
                this.testing();
              }, 1000);
            }
    });
    // this.timer = interval(250).takeUntil(this.subject)
    //   .subscribe(timer => {
    //     if (timer <= this.countDownValue) {
    //       this.counter = this.countDownValue - timer;
    //       this.per = this.vall - 20;
    //     } else {
    //       this.missed = true;
    //       this.dis = true;
    //       this.subject.next();
    //       setTimeout(() => {
    //        this.missed = false;
    //        this.dis = false;
    //         this.testing();
    //       }, 1000);
    //     }
    //   });
  }
  personalCredit(d: any) {
    this.answered = true;
    this.dis = true;
   if (this.answer ===  d) {
     this.score += 10;
     this.correct = true;
     this.right_hits++;
     this.timer.unsubscribe();
      setTimeout(() => {
        this.correct = false;
        this.testing();
      }, 1000);
   } else {
     this.wrong = true;
     this.wrong_hits++;
     this.timer.unsubscribe();
      setTimeout(() => {
        this.wrong = false;
        this.testing();
      }, 1000);
   }
  }
  personalDebit(d: any) {
    this.answered = true;
    this.dis = true;
    if (this.answer ===  d) {
      this.score += 10;
      this.correct = true;
      this.right_hits++;
      this.timer.unsubscribe();
      setTimeout(() => {
        this.correct = false;
        this.testing();
      }, 1000);
    }  else {
      this.wrong = true;
      this.wrong_hits++;
      this.timer.unsubscribe();
      setTimeout(() => {
        this.wrong = false;
        this.testing();
      }, 1000);
    }
  }
  testing() {
    this.totalQuestions = this.quesions.length;
    if (this.quesions[this.i] != null) {
      this.test = this.quesions[this.i].name;
      this.answer = this.quesions[this.i].type;
      this.timerFunction();
    }
    this.i++;
    this.dis = false;
    this.correct = false;
    this.wrong = false;
    this.count --;
    this.current_ques++;
    if (this.count <= -1) {
      this.dis = true;
      this.display = false;
      this.secondPage = true;
      this.current_ques = 20;
    }
    if (this.counter === 0) {
        this.shots_missed++;
    }
    if (this.shots_pending <= 1) {
      this.shots_pending = 0;
    } else {
      this.shots_pending--;
    }
  }

}
