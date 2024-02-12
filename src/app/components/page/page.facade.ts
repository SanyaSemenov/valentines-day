import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

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
    button: 'You\'re right, I\'m coller!',
    maggie: {
      text: 'Hi, I finally got to meet you! My dad told me a lot of cool things about you, and now I think you might be even cooler than me!',
    }
  },
  {
    name: 'angry',
    button: 'Okay!',
    maggie: {
      text: 'You know I need my dad right now, so you won\'t get to spend this Valentine\'s Day together, but that\'s not all!',
      angry: true,
    }
  },
  {
    name: 'compliments',
    button: 'What\'s next?',
    maggie: {
      text: 'Wow, you really are awesome, now I totally get my dad... My dad must be really sad that you\'re not around because he loves you so much 😔',
      eyes: '❤️',
    }
  },
  {
    name: 'options',
    button: 'I\'m sure',
    maggie: {
      text: 'Okay, now it\'s time to choose how you want to spend Valentine\'s Day with my dad when you see him! Choose carefully (although who am I lying to, you\'ll try everything anyway)',
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
      text: 'You did it! All right, here\'s your ticket... Really hope to see you and your dogs someday, byeee'
    }
  },
]

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

  readonly instagramMode$ = new BehaviorSubject<boolean>(
    localStorage.getItem(this.instagramKey) === 'true'
  )

  setInstagramMode(enabled = true): void {
    localStorage.setItem(this.instagramKey, JSON.stringify(enabled));
    this.instagramMode$.next(enabled);
  }

  nextStep(): void {
    if (this.step$.value.next) {
      this.step$.next(this.step$.value.next);
    }
  }
}