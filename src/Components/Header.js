import React, { useEffect, useRef } from 'react';
import './header.css';

function Header(props) {
  const resultRef = useRef();
  const expressionRef = useRef();

  useEffect(() => {
    resultRef.current.scrollIntoView();
  }, [props.history]);

  useEffect(() => {
    expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
  }, [props.expression]);


  return (
    <div className="header">
      <div className="header_history">
        {props.history && props.history.map((item) => (
          <p key={item + "" + Math.random() * 44}> {item} </p>
        ))}
      </div>
      <br />
      <div ref={expressionRef} className="header_expression">
        <p>{props.expression}</p>
      </div>
      <div className="header_result" ref={resultRef}>
        {props.result}
      </div>
    </div>
  );
}

export default Header;
