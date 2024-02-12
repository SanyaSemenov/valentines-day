import { Injectable } from "@angular/core";
import { StateChange } from "ng-lazyload-image";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environment/environment";

type PageStepType = 'default' | 'angry' | 'compliments' | 'options' | 'secret' | 'result';

interface MaggieConfig {
  text: string;
  eyes?: string;
  angry?: boolean;
}

interface PageStep {
  name: PageStepType;
  maggie: MaggieConfig;
  button?: string;
  next?: PageStep;
}

const stepsArray: PageStep[] = [
  {
    name: 'default',
    button: 'Yes!',
    maggie: {
      text: 'Hi, I finally got to meet you!<br>But first of all, will you be my dad\'s valentine?🥺🥺🥺',
    }
  },
  {
    name: 'angry',
    button: 'Okay!',
    maggie: {
      text: 'You know I need my dad right now, so you won\'t get to spend this Valentine\'s Day together, and I\'m not sorry!',
      angry: true,
    }
  },
  {
    name: 'compliments',
    button: 'Oh, come on, what\'s next?',
    maggie: {
      text: 'Wait, wooooow, you really are awesome, now I totally get my dad...<br>My dad loves you so much, he must be really sad that you\'re not around 😔',
      eyes: '❤️',
    }
  },
  {
    name: 'options',
    button: 'I\'m sure',
    maggie: {
      text: 'Okay, now it\'s time to choose how you want to spend Valentine\'s Day with my dad when you see him!<br>Choose carefully (although who am I lying to, you\'ll try everything anyway)',
    }
  },
  {
    name: 'secret',
    button: 'Give me my ticket',
    maggie: {
      text: 'Heheheheh now you have to type secret magic words, or else I will not give you a ticket',
    }
  },
  {
    name: 'result',
    maggie: {
      text: 'You did it! All right, here\'s your ticket... Really hope to see you and your dogs someday, byeee<br>And remember: my dad loves you with his full sick heart ❤️ Please love him back'
    }
  },
];

const kennyImages = [
  '/assets/baby1.webp',
  '/assets/baby2.webp',
  '/assets/baby3.webp',
  '/assets/baby4.webp',
  '/assets/baby5.webp',
].map((image) => `${environment.basePath}${image}`);

const buildLinedSteps = () => {
  const reverseSteps = stepsArray.reverse();

  return reverseSteps.reduce((acc, item, index) => {
    const previous = reverseSteps[index + 1];

    if (previous) {
      previous.next = item;

      return previous;
    }

    return acc;
  }, null as unknown as PageStep);
}

@Injectable()
export class PageFacade {
  readonly instagramKey = 'instagramMode';
  readonly firstStep = buildLinedSteps();
  readonly step$ = new BehaviorSubject<PageStep>(this.firstStep);
  readonly bgLoaded$ = new BehaviorSubject(false);
  readonly maggieLoaded$ = new BehaviorSubject(false);

  readonly instagramMode$ = new BehaviorSubject<boolean>(
    localStorage.getItem(this.instagramKey) === 'true'
  );

  readonly maggieDefault = `${environment.basePath}/assets/maggie-default.png`;
  readonly maggieAngry = `${environment.basePath}/assets/maggie-angry.png`;
  readonly kennyImages = this.buildKennyImages();
  prelaodedImages: HTMLImageElement[] = [];

  constructor() {
    this.preloadImages();
  }

  setInstagramMode(enabled = true): void {
    localStorage.setItem(this.instagramKey, JSON.stringify(enabled));
    this.instagramMode$.next(enabled);
  }

  nextStep(): void {
    if (this.step$.value.next) {
      this.step$.next(this.step$.value.next);
    }
  }

  onBgState(state: StateChange): void {
    if (state.reason === 'loading-succeeded') {
      this.bgLoaded$.next(true);
      this.removePreloader();
    }
  }

  onMaggieState(state: StateChange): void {
    if (state.reason === 'loading-succeeded') {
      this.maggieLoaded$.next(true);
      this.removePreloader();
    }
  }

  private removePreloader(): void {
    if (this.bgLoaded$.value && this.maggieLoaded$.value) {
      const preloader = document.getElementById('preloader');

      preloader?.classList.add('preloader--hidden');
    }
  }

  private preloadImages(): void {
    const sources = [
      this.maggieAngry,
      ...kennyImages
    ];

    this.prelaodedImages = sources.map((source) => {
      const image = new Image();
      image.src = source;
      return image;
    })
  }

  private buildKennyImages() {
    return kennyImages.map((source, index) => {
      let distance = 40;
      let angle = (Math.PI / 4) - index * Math.PI / (180 / 67.5);
      if (index === 1) {
        angle -= Math.PI / 12;
      }
      if (index === 3) {
        angle += Math.PI / 12;
      }
      if (index === 2) {
        distance = 30;
      }
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        delay: index * 0.2,
        rotate: (Math.random() * 2 - 1) * (Math.random() * 10 + 10),
        source,
      };
    })
  }
}