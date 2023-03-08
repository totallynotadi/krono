// @ts-nocheck
import { bounceInOut } from 'svelte/easing';

export function fadeScale({ duration = 150, easing = bounceInOut, baseScale = 0.88 }) {
	const is = 1 - baseScale;

	return {
		duration,
		easing: easing,
		css: (t) => {
			return `transform-origin:top left; filter:blur(${t}px); transform:scale(${
				t * is + baseScale
			})`;
		}
	};
}
