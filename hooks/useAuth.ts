import {onAuthStateChanged} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {auth} from "../App";

const useAuth = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
        })
    }, []);

    return {user};
}

export default useAuth;