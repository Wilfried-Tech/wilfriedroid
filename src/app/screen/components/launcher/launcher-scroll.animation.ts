import {
  animate,
  animateChild,
  animation,
  sequence,
  state,
  style,
  transition,
  trigger,
  useAnimation
} from "@angular/animations";


export type LauncherScrollState = 'move' | 'change';

const params = {position: 0, deltaX: 0}

export const launcherScrollAnimationTrigger = trigger('launcherScroll', [
  state('change', style({
    transform: 'translateX({{position}}px)'
  }), {params: params}),
  state('move', style({
    transform: 'translateX(calc({{position}}px + {{deltaX}}px))'
  }), {params: params}),
  transition('move => change', animate(250)),
  transition('* => *', [
    animateChild()
  ])
])

export type LauncherSlideState = 'current' | 'next' | 'none'

export const rotateAnimation = [
  state('current', style({
    transform: 'rotateY({{angle}}deg)',
    opacity: '{{opacity}}'
  })),
  state('next', style({
    transform: 'rotateY(calc(90deg - {{angle}}deg))',
    opacity: 'calc(1 - {{opacity}})'
  }))
]

export const launcherScrollChildAnimationTrigger = trigger('launcherScrollChild', [
  ...rotateAnimation
])
