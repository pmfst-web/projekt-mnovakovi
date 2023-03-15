const info = (...poruke) => {
    if(process.env.NODE_ENV === 'development'){
      console.log(...poruke);
    }
    
  }
  
  const greska = (...poruke) => {
    if(process.env.NODE_ENV !== 'development'){
      console.error(...poruke);
    }
  
  }
  
  module.exports = {info, greska}