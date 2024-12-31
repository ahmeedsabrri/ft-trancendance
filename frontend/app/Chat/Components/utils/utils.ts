import { useState, useEffect } from 'react';


export function timeHandle(time: string) {
    if (!time)
        return "";
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes} PM`;
}


const useDelayedLoading = (isLoading: boolean, delay: number) => {
    const [delayedLoading, setDelayedLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayedLoading(isLoading);
        }, delay);

        return () => clearTimeout(timer);
    }, [isLoading, delay]);

    return delayedLoading;
};

export default useDelayedLoading;