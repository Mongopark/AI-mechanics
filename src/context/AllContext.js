//TREAT AS IMPORTANT!!! MAKE SURE THIS FILE IS ASSESIBLE GLOBALLY AND IMPORTED INTO THE APP JS OR THE PARENT COMPONENT. BECAUSE ALL THE CONTEXT GOES HERE
import React, { createContext, useState } from "react";
const AllContext = createContext();

const AllProvider = ({ children }) => {
  const [whitebg, setWhitebg] =React.useState('white');
  const [greybg, setGreybg] =React.useState('#030303');
  const [darkbg, setDarkbg] =React.useState('#a9a9a9');
  const [colos, setColos] =React.useState(true);
  const [orange, setOrange] =React.useState('orange');
  const [green, setGreen] =React.useState('green');
  const [purple, setPurple] =React.useState('purple');
  const [blue, setBlue] =React.useState("#4169e1");
  const [lightblue, setLightblue] =React.useState('#e4f6f8');
  const [numone, setNumone] =React.useState(0);
  const [numtwo, setNumtwo] =React.useState(10);
  const [numthree, setNumthree] =React.useState(20);
  
  
  return (
    <AllContext.Provider value={{
        whitebg, setWhitebg, greybg, setGreybg, darkbg, setDarkbg, colos, setColos, orange, setOrange, green, setGreen, purple, setPurple, blue, setBlue, lightblue, setLightblue, numone, setNumone, numtwo, setNumtwo, numthree, setNumthree,
    }}>
        {children}
        </AllContext.Provider>
        );
  };

  export {AllContext, AllProvider};