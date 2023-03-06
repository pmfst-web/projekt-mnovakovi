import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const objave = [
  {
    id: 1,
    sadrzaj: 'Prva objava',
    datum: '2019-05-30T17:30:31.098Z',
    likeovi: [],
    komentari: []
  },
  {
    id: 2,
    sadrzaj: 'Druga objava',
    datum: '2019-05-30T17:30:31.098Z',
    likeovi: [],
    komentari: []
  },
  {
    id: 3,
    sadrzaj: 'Treća objava',
    datum: '2019-05-30T17:30:31.098Z',
    likeovi: [],
    komentari: []
  }
]
const komentari = [
  {
    id: 1,
    sadrzaj: 'Prvi komentar',
    datum: '2019-05-30T17:30:31.098Z',
    ID_objava: 1
  },
  {
    id: 2,
    sadrzaj: 'Drugi komentar',
    datum: '2019-05-30T17:30:31.098Z',
    ID_objava: 2
  },
  {
    id: 3,
    sadrzaj: 'Treći komentar',
    datum: '2019-05-30T17:30:31.098Z',
    ID_objava: 3
  }
]

ReactDOM.render(<App objave={objave} komentari={komentari}/>,document.getElementById('root'))

