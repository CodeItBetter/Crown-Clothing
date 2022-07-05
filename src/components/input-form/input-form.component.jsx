import './input-form.styles.scss';

const InputForm  = ({label, ...otherprops}) =>{
    return(
        <div className="group">
            <input {...otherprops} className="form-input" />
            <label className={`${otherprops.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
        </div>
    )
}

export default InputForm;