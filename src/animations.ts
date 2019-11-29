// @ts-ignore
import {Expo, gsap} from "gsap/all";

const timeout = 1.8;

export const animateCardRotation = (cardEl: HTMLElement, symbolEl: HTMLElement, onStart: () => void, idx: number) => {
    const idxDelay = 0.1 * idx;
    gsap.fromTo(symbolEl, {
        filter: 'none',
    }, {
        filter: 'none',
    });
    gsap.fromTo(cardEl, {
            filter: 'brightness(100%) blur(0px) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            ease: Expo.easeOut,
        }, {
            duration: timeout / 2,
            filter: 'brightness(0%) blur(0px) drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.25))',
            ease: Expo.easeOut,
        }
    );
    gsap.fromTo(cardEl, {
            filter: 'brightness(0%) blur(0px) drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.25))',
            ease: Expo.easeOut,
        }, {
            onStart,
            delay: timeout / 2 + idxDelay,
            duration: timeout / 2,
            filter: 'brightness(100%) blur(0px) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            ease: Expo.easeOut,
        }
    );
};
