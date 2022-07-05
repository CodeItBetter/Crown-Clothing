import './button.styles.scss';

const Button = ({children, buttonprop, ...otherprops}) =>{
    const BUTTON_TYPE_CLASSES = {
        google:'google-sign-in',
        inverted: 'inverted'

    }
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonprop]}`} {...otherprops}>
        {children}</button>
    )
}

export default Button;