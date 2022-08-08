import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from './index.module.css';
import * as wasm from '../../wasm';

interface AboutProps { }

const About: NextPage<AboutProps> = (props: AboutProps) => {
  useEffect(() => {
    wasm.add(1, 2)
      .then((val) => {
        console.log("about", val, Math.random());
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <div className={styles.about}>
      About page
      <div>
        <Link href="/">
          <a>Home Page</a>
        </Link>
      </div>
    </div>
  );
}

export default About;
