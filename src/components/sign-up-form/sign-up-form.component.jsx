import { createUserDocFireStore,
createFirebaseUserWithEmailAndPassword } from "../../utils/firebase/firebase";
import { useState } from "react";
import InputForm from "../input-form/input-form.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const SignUpForm = () =>{
    const displayField = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formField, setFormField] = useState(displayField);

    const resetField = () =>{
        setFormField(displayField);
    }

    const formHandler = (e) =>{
        const {name, value} = e.target;
        setFormField(() =>{
            return { ...formField, [name]: value};
        })
    }
    
    const {email, password, displayName, confirmPassword} = formField;

    const submitHandler = async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('Password mismatch!');
            return;
        }

        try{
            const response = await createFirebaseUserWithEmailAndPassword(email, password);
            console.log(response);
            await createUserDocFireStore(response.user, {displayName});
            resetField();
        }catch(err){
            if(err.code === 'auth/email-already-in-use'){
                alert('Email-already-in-use!');
                return;
            }else{
                console.log('Error', err);
            }
        }
    }
    return(
        <div className="signup-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={submitHandler}>
                <InputForm label="DisplayName" type="text"
                    onChange={formHandler} name="displayName" value={displayName} />

                <InputForm label="Email" type="email" 
                    onChange={formHandler} name="email" value={email} />

                <InputForm label="Password" type="password" 
                    onChange={formHandler} name="password" value={password} />

                <InputForm label="Confirm Password" type="password" 
                     name="confirmPassword" 
                    value={confirmPassword}  onChange={formHandler} />
                
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
;