import { animate, animateChild, group, keyframes, query, state, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ left: '-100%' })]),
      query(':leave', animateChild(), { optional: true }),  //adding here solved my problem
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%', opacity: 0 })),
        ]),
        query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
      ]),
    ]),
  ]);

  export const inOutAnimation = trigger("inOutAnimation", [
    state("in", style({ opacity: 1 })),
    transition(":enter", [
      animate(
        300,
        keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ opacity: 0.25, offset: 0.25 }),
          style({ opacity: 0.5, offset: 0.5 }),
          style({ opacity: 0.75, offset: 0.75 }),
          style({ opacity: 1, offset: 1 }),
        ])
      )
    ]),
    transition(":leave", [
      animate(
        300,
        keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0.75, offset: 0.25 }),
          style({ opacity: 0.5, offset: 0.5 }),
          style({ opacity: 0.25, offset: 0.75 }),
          style({ opacity: 0, offset: 1 }),
        ])
      )
    ])
  ])