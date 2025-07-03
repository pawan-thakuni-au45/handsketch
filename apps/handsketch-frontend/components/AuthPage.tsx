"use client"
export  function AuthPage({isSignIn}:{isSignIn:boolean}){

    return <div className="w-screen h-screen flex justify-center items-center">
        <input type="text" placeholder="email"></input>
        <input type="password" placeholder="password"></input>

        <button onClick={()=>{

        }}>{isSignIn ? "SignIn" : "SignUp"}</button>
    </div>
}