'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [isbn, setIsbn] = useState("");

  const handleChange = (e) => {
    setIsbn(e.target.value);
  }

  const handlesubmit = (e) => {
    console.log(isbn);
  }


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <input value={isbn}  onChange={handleChange} placeholder="Enter ISBN"></input>
        <button onClick={handlesubmit}>Search</button>
      </main>
    </div>
  );
}
