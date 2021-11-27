import React from 'react'
import addContent from './add-content.js';
// import img1 from '../assets/a.jpg';
// import img2 from '../assets/b.jpeg';
import styles from './style.scss'
import ('./bar').then(({add}) => {
    console.log('======异步加载：',add(1, 2));
})
document.write(`<h1 class=${styles.partant}></h1>React <br />`)
addContent()