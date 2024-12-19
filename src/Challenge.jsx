import React, { useState, useEffect } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyACq6LOxfNrUCpHtowTyBpbpbJOWyOfWyA",
    authDomain: "challenger-648f3.firebaseapp.com",
    projectId: "challenger-648f3",
    storageBucket: "challenger-648f3.firebasestorage.app",
    messagingSenderId: "736297614690",
    appId: "1:736297614690:web:9cf8936f21e2313c1c003b",
    measurementId: "G-70WLLMNYK0"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Challenger = () => {
  const [clickTimes, setClickTimes] = useState({
    days: null,
    hours: null,
    minutes: null,
  });

  const [displayText, setDisplayText] = useState({
    days: "Not clicked yet",
    hours: "Not clicked yet",
    minutes: "Not clicked yet",
    seconds: "Not clicked yet"
  });

  // Fetch data from Firebase on load
  useEffect(() => {
    const docRef = doc(db, "clickTimes", "timestamps");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setClickTimes(doc.data());
      }
    });

    return () => unsubscribe();
  }, []);

  // Update the display text dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText({
        days: clickTimes.days
          ? formatDistanceToNowStrict(new Date(clickTimes.days), { unit: "day" })
          : "Not clicked yet",
        hours: clickTimes.hours
          ? formatDistanceToNowStrict(
              new Date(clickTimes.hours),
              { unit: "hour" }
            )
          : "Not clicked yet",
        minutes: clickTimes.minutes
          ? formatDistanceToNowStrict(
              new Date(clickTimes.minutes),
              { unit: "minute" }
            )
          : "Not clicked yet",
        seconds: clickTimes.seconds
          ? formatDistanceToNowStrict(
              new Date(clickTimes.seconds),
              { unit: "second" }
            )
          : "Not clicked yet",
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [clickTimes]);

  // Handle button click and update Firebase
  const handleClick = async (unit) => {
    const newTime = { ...clickTimes, [unit]: new Date().toISOString() };
    await setDoc(doc(db, "clickTimes", "timestamps"), newTime);
    setClickTimes(newTime);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div>
        <button onClick={() => handleClick("days")}>DAYS</button>
        <button onClick={() => handleClick("hours")}>HOURS</button>
        <button onClick={() => handleClick("minutes")}>MINUTES</button>
        <button onClick={() => handleClick("minutes")}>SECONDS</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>Days: {displayText.days}</p>
        <p>Hours: {displayText.hours}</p>
        <p>Minutes: {displayText.minutes}</p>
        <p>Seconds: {displayText.seconds}</p>
      </div>
    </div>
  );
};

export default Challenger;
