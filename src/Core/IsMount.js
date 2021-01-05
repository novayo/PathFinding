import { useRef, useEffect } from 'react';

export const IsMount = () => {
    const isMount = useRef(true);

    useEffect(() => {
        isMount.current = false;
    }, [])

    return isMount.current;
}

