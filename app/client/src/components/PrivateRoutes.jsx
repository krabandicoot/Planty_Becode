import { Route, Redirect } from "react-router";

const PrivateRoute = ({ children, ...rest }) => {
    let auth = { 'token': false }
}