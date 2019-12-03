// @ts-ignore
import {Expo, gsap} from "gsap/all";

const timeout = 1.8;

export const animateCardRotation = (cardEl: HTMLElement, symbolEl: HTMLElement, idx: number) => {
    const idxDelay = 0.1 * idx;
    gsap.fromTo(cardEl, {
        rotateY: 0,
        duration: timeout,
    }, {
        rotateY: 1800,
        duration: timeout,
    });
    gsap.fromTo(symbolEl, {
        filter: 'none',
        rotateY: 0,
        duration: timeout,
    }, {
        filter: 'none',
        rotateY: 1800,
        duration: timeout,
    });
    gsap.fromTo(cardEl, {
            filter: 'brightness(100%) blur(0px) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            ease: Expo.easeOut,
        }, {
            duration: timeout / 4,
            filter: 'brightness(10%) blur(3px) drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.25))',
            ease: Expo.easeOut,
        }
    );
    gsap.fromTo(cardEl, {
            filter: 'brightness(10%) blur(3px) drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.25))',
            ease: Expo.easeOut,
        }, {
            delay: timeout / 4 + idxDelay,
            duration: timeout * 3 / 4,
            filter: 'brightness(100%) blur(0px) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            ease: Expo.easeOut,
        }
    );
};
