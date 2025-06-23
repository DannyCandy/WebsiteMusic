import { SignInButton } from '@clerk/clerk-react'
import { Button } from "./ui/button";

const SignInButs = () => {
	

	return (
		<SignInButton
            forceRedirectUrl={"/auth-callback"}
            signUpForceRedirectUrl={"/auth-callback"}
            fallbackRedirectUrl={"/auth-signin-error"}
            signUpFallbackRedirectUrl={"/auth-signup-error"}
        >
            <Button variant={"secondary"} className='w-full text-white border-zinc-200 h-11'>
                <img src='/google.png' alt='Google' className='size-5' />
                Login
            </Button>
        </SignInButton>
	);
};
export default SignInButs;
