import {onAuthStateChanged} from 'firebase/auth';
import {useEffect, useState} from 'react';
import {auth} from "../App";

const useAuth = () => {
    const [user, setUser] = useState({isAuth: false});

    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            if (user) {
                setUser({...user, isAuth: true});
            } else {
                setUser({isAuth: false});
            }
        })
    }, []);

    return {user, setUser};
}

export default useAuth;