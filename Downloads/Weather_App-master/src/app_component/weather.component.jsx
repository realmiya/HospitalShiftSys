import React, { useState } from "react";
import "./weather.style.css";

const Weather = (props) => {
  const [sentence, setSentence] = useState("");

  function maxminTemp(min, max) {
    if (max && min) {
      return (
        <h3>
          <span className="px-4">{min}&deg;</span>
          <span className="px-4">{max}&deg;</span>
        </h3>
      );
    }
  }
// 函数的名字小写字母，组件大写


  const MakeWord = (description) => {
    const new_words = (words) => {
      console.log("wordsstr "+words);
      // console.log("typeof "+typeof words);
      const strDescription = "";
      words.map((x) => {
        const newx = x.charAt(0).toUpperCase() + x.substring(1);
        console.log(newx);
        strDescription.concat(" ", newx);
        return strDescription;
      });
      // console.log(strDescription);
      return strDescription;
    };
    if (description) {
      const words = description.split(" ");
      const strfinal= new_words(words);
      setSentence(strfinal);
      return(
        <>
        <div>sdcs</div>
        <div>{sentence}</div>
        </>
      )
      // setSentence(new_words(words));

      // console.log(description);

      // console.log(words);

      // setSentence(new_words);
      // console.log(strDescription);

      // if (sentence!=='') {
      //   return (
      //     <h3>
      //       <span className="px-4">{sentence}</span>
      //     </h3>
      //   );
      // }
    }
  };

  return (
    <div className="container text-light">
      <div className="Card">
        {props.input ? null : (
          <div className="row justify-content-md-center">
            <div className="col"></div>
            <div className="col-md-auto">
              <div className="alert alert-danger" role="alert">
                Please input city and country.
              </div>
            </div>
            <div className="col"></div>
          </div>
        )}
        {/* {props.input&&  (
          <div className="alert alert-danger" role="alert">
            Please input city and country.
          </div>
        )} */}
        <h1 className="text-white py-3">{props.cityname}</h1>
        <h5 className="py-4">
              <i className={`wi ${props.weatherIcon} display-1`} />
            </h5>
            {MakeWord(props.description)}

        <div className="bigbox">
          <div className="fbox">
            {/* Get Celsius */}
            {props.temp_celsius ? (
              <h1 className="py-2">Now {props.temp_celsius}&deg;</h1> // py means :p --> for classes that set padding; y--> for classes that set both *-top and *-bottom in bootstrap
            ) : null}


          </div>
          <div className="fbox">
            {/* feel-like temp */}
            {props.temp_feels_like && (
              <h1>Feels Like {props.temp_feels_like}&deg;</h1>
            )}
            {/* {props.temp_feels_like ?( <h1>{props.temp_feels_like}&deg;</h1>):<div>dsddc</div>} */}

            {/* show max and min temp , return 里面可以写return */}
            {maxminTemp(props.temp_min, props.temp_max)}
          </div>
        </div>

        {/* Weather description */}

        {/* <h4 className="py-3">
          取第0位index为char */}
        {/* {props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}
        </h4> */}

        
      </div>
    </div>
  );
};
export default Weather;
