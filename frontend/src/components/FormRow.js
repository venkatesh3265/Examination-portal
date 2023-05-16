const FormRow = ({ type, name, value, handleChange, labelText }) => {
    return (
      <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>

      {type === 'radio' ? (
        <>
          {value.map((option, index) => (
            <div key={index}>
              <input
                type={type}
                name={name}
                value={option}
                onChange={handleChange}
                className='form-input'
              />
              <label>{option}</label>
            </div>
          ))}
        </>
      ) : (
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className='form-input'
        />
      )}
    </div>
    );
  };
  
  export default FormRow;