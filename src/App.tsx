import React, {Ref, useRef, useState} from 'react';
import Card from "./components/Card";
import './App.css';
import { Button } from '@material-ui/core';
// @ts-ignore
import { gsap, Expo } from "gsap";

const timeout = 3.6;

const App: React.FC = () => {
    const [isChosen, setChosen] = useState(false);
    const cardEl = useRef(null);
    const handleClick = () => {
        gsap.to(
            // @ts-ignore
            cardEl.current,
            {
                duration: timeout,
                rotationY: 3600,
                ease: Expo.easeOut,
            },
        );
        gsap.fromTo(
            // @ts-ignore
            cardEl.current,
            {
                filter: 'brightness(100%)',
                ease: Expo.easeOut,
            },
            {
                duration: timeout / 2,
                filter: 'brightness(0%)',
                ease: Expo.easeOut,
            }
        );
        gsap.fromTo(
            // @ts-ignore
            cardEl.current,
            {
                filter: 'brightness(0%)',
                ease: Expo.easeOut,
            },
            {
                onStart: () => setChosen(true),
                delay: timeout / 2,
                duration: timeout / 2,
                filter: 'brightness(100%)',
                ease: Expo.easeOut,
            }
        );
    };

  return (
    <div className='App'>
      <Card cardRef={cardEl} isChosen={isChosen} />
        <Button variant="contained" color="primary" onClick={handleClick}>
            Primary
        </Button>
    </div>
  );
};

export default App;
