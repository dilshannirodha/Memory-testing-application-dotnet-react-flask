import React, { useState, useContext } from "react";
import ContentSelector from "../components/ContentSelector";
import AppContext from "../contexts/AppContext"; // Import your context
import TimeSelector from "../components/TimeSelector";
import Countdown from "../components/Countdown";
import FileUpload from "../components/FileUpload";
import SelectMaterial from "../components/SelectMaterial";
import TextInput from "../components/TextInput";


const Home = () => {
    const { start,time,option, setOption } = useContext(AppContext); // Use context to get and set the option

  return (
    <div>
        

    {time} {}
    </div>
  );
};

export default Home;