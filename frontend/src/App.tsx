import Choosing from "./Choosing";
import {ToastContainer} from "react-toastify";
import * as React from 'react';

const App: React.FC = () => (
    <>
        <Choosing />
        <ToastContainer
            position={"bottom-left"}
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
        />
    </>
);

export default App;