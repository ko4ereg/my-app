import Select from 'react-select'
import s from './ProfileDataForm.module.css';
import React  from 'react';



const options = [
    { value: 'manicure', label: 'маникюр' },
    { value: 'pedicure', label: 'педикюр' },
    { value: 'massage', label: 'массаж' },
    { value: 'hair', label: 'волосы'}
]



const Selector = (props) => {
 
    const handleBlur = () => {
        props.setClicked(true);
    };
    

    // const filteredOptions = options.filter(option => !props.value.includes(option.value));
    return (
       
        <Select className={props.clicked && props.value.length === 0 ? s.error : s.selector} placeholder="подготовили список - выбирай!"
            // options={options}
            options={options}
            onChange={props.handleSelectChange}
            // value={props.value.map((option) => ({
            //     label: option,
            //     value: option,
            //   }))}
              defaultValue={props.selectedOptions && options.filter(option => props.selectedOptions.includes(option.label))}
            onBlur={handleBlur}
            isMulti
            styles={{
                placeholder: (baseStyles, state) => ({
                    ...baseStyles,
                    color: "#999999",
                }),
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: "none",
                    padding: "0px",
                    outline: "none",
                    boxShadow: 'none',
                    "&:hover": {
                        border: "none",
                        outline: "none",
                        boxShadow: 'none'
                    }
                }),
                indicatorSeparator: (baseStyles, state) => ({
                    ...baseStyles,
                    display: "none",
                }),
                valueContainer: (baseStyles, state) => ({
                    ...baseStyles,
                    outline: "none",
                    padding: '0px'
                })
            }} />
 
    )
}

export default Selector;