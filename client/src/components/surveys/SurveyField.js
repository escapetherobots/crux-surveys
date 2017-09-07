import React from 'react';

export default ( /*props*/ {input, label, meta: { error, touched } } ) => {
  //console.log(input); // props.input component listeners
  // console.log(meta); // access to form field object with error data

  const style = {
    marginB20: {
      'marginBottom': '20px'
    },
    marginB5: {
      'marginBottom': '5px'
    }
  }

  return (
    <div>
      <label>{label}</label>
      <input {...input} style={style.marginB5} />
      <div className="red-text" style={style.marginB20} >
        {touched && error}
      </div>
    </div>
  );
};
