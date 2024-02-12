import { animate, style, transition, trigger } from '@angular/animations';

type AnimationConfig = { withTransform: boolean, duration: number};

const defaultConfig: AnimationConfig = { withTransform: true, duration: 300 };

export const fadeInOut = (config?: Partial<AnimationConfig>) => {
  const animationConfig = {
    ...defaultConfig,
    ...(config || {}),
  };

  const fadeOutStyle = {
    opacity: '0',
    ...(animationConfig.withTransform ? { transform: 'translateY(-10%)' } : {}),
  };

  const fadeInStyle = {
    opacity: '1',
    ...(animationConfig.withTransform ? { transform: 'translateY(0%)' } : {}),
  };

  return trigger('fadeInOut', [
    transition('void => *', [style(fadeOutStyle), animate(animationConfig.duration)]),
    transition('* => void', [animate(animationConfig.duration, style({ opacity: '0' }))]),
    transition('* => *', [
      style(fadeOutStyle),
      animate(animationConfig.duration, style(fadeInStyle)),
    ]),
  ]);
}