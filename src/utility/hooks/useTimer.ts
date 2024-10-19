import { useEffect, useState } from "react";

const useTimer = (startTime:number=120) => {
    const [time, setTime] = useState(0)
    const [intervalID, setIntervalID] = useState<any>(null)
    const hasTimerEnded = time >= startTime
    const isTimerRunning = intervalID != null

    const update = () => {
        setTime(time => time + 1)
    }

    const startTimer = () => {
        if (!hasTimerEnded && !isTimerRunning) {
            setIntervalID(setInterval(update, 1000))
        }
    }

    const stopTimer = () => {
        clearInterval(intervalID)
        setIntervalID(null)
    }

    // clear interval when the timer ends
    useEffect(() => {
        if (hasTimerEnded) {
            clearInterval(intervalID)
            setIntervalID(null)
            setTime(0)
        }
    }, [hasTimerEnded])

    // clear interval when component unmounts
    useEffect(() => () => {
        clearInterval(intervalID)
    }, [])

    return {
        time,
        startTimer,
        stopTimer,
    }
}

export default useTimer