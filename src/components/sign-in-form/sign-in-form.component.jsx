import { signInWithGooglePopUp, createUserDocFireStore,
signInFirebaseWithEmailAndPassword } from "../../utils/firebase/firebase";
import { useState } from "react";
import InputForm from "../../components/input-form/input-form.component";
import './sign-in-form.styles.scss';
import Button from "../../components/button/button.component";

const SignInForm = () =>{
    const displayField = {
        email: '',
        password: '',
    }

    const [formField, setFormField] = useState(displayField);

    const resetField = () =>{
        setFormField(displayField);
    }

    const onClickHandler = async () =>{
        const { user } = await signInWithGooglePopUp();
        await createUserDocFireStore(user);
    }

    const formHandler = (e) =>{
        const {name, value} = e.target;
        setFormField(() =>{
            return { ...formField, [name]: value};
        })
    }
    
    const {email, password} = formField;

    const submitHandler = async (event) =>{
        event.preventDefault();

        try{
            const { user } = await signInFirebaseWithEmailAndPassword(email, password);
            console.log(user);
            resetField();
        }catch(err){
            if(err.code === 'auth/user-not-found'){
                alert('user-not-found');
                return;
            }else if(err.code === 'auth/wrong-password'){
                alert('wrong-password');
                return;
            }else{
                console.log('Error', err)
            }
        }
    }
    return(
        <div className="signup-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={submitHandler}>
                <InputForm label="Email" type="email" 
                    onChange={formHandler} name="email" value={email} />

                <InputForm label="Password" type="password" 
                    onChange={formHandler} name="password" value={password} />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonprop="google" 
                    onClick={onClickHandler}>Google SignIn</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;
;