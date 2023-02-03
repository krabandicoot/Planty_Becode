import useAuth from "../hooks/useAuth";
const ACCOUNT_URL = "/api/account/username";

export function User() {
    // const { setAuth } = useAuth();

    // const handleLogout = () => {
    //     e.preventDefault();

    //     const configuration = {
    //         method: 'get',
    //         url: SIGNIN_URL,
    //         data: {
    //             username,
    //             password
    //         },
    //         withCredentials: true,
    //     }

    //     try {
    //         const response = await axios(configuration);
    //         console.log("You are logged");

    //         console.log(JSON.stringify(response?.data));
    //         const user = response?.data?.username;

    //         setAuth({});
    //         localStorage.clear();
    //         console.log("logged out");

    //     } catch (err) {
    //         if (!err?.response) {
    //             console.log(err)
    //             setErrMsg("No server Response");
    //         } else if (err.response?.status === 400) {
    //             console.log(err)
    //             setErrMsg("Missing Username or Password");
    //         } else if (err.response?.status === 401) {
    //             console.log(err)
    //             setErrMsg("Unauthorized");
    //         } else {
    //             console.log(err)
    //             setErrMsg("Login Failed");
    //         }
    //         errRef.current.focus();
    //     };


    return (
        <section>
            <h1>User</h1>
            <button className="Sign Out" ></button>
        </section>
    )
}

