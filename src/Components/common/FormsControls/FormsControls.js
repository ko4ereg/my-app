import { Field } from 'redux-form';
import styles from './FormsControls.module.css';

const FormControl = ({input, child, meta, ...props}) => {
    
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '') } >
            <div> {props.children} </div>
           <div> {hasError && <span>{meta.error}</span> }</div>
        </div>
    )
}

export const Textarea = ( props ) => {
    const {input, child, meta, ...restProps} = props;
    return (
       <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
    )
}

export const Input = (props) => {
    const {input, child, meta, ...restProps} = props;
    return (
        <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
    )
}

export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
return <div>
    <Field placeholder={placeholder} name={name} validators={validators} component={component} {...props} />
{text} </div>    
}
