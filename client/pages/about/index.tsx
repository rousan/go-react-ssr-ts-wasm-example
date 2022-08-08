import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from './index.module.css';
import * as wasm from '../../wasm';
import pic from '../../media/pic.png';

interface AboutProps { }

const About: NextPage<AboutProps> = (props: AboutProps) => {
  return (
    <div className={styles.about}>
      About page
      <div>
        <Link href="/">
          <a>Home Page</a>
        </Link>
      </div>
      <div>
        <img src={pic.src} />
      </div>
    </div>
  );
}

export default About;
