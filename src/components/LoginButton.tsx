import { Dispatch, SetStateAction } from 'react';

// this interface and file handles the login functionality
interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

// function handler for logging into the website
export function LoginButton(props: loginProps) {

  const authenticate = () => {
    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  }

  if (props.isLoggedIn) {
    return (
      <button aria-label='Sign Out' onClick={authenticate}>Sign out</button>
    )
  } else {
    return (
      <button aria-label='Login' onClick={authenticate}>Login</button>
    )
  }
}