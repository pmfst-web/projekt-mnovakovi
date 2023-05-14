const info = (...poruke) => {
    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
      console.log(...poruke);
    }
    
  }
  
  const greska = (...poruke) => {
    if(process.env.NODE_ENV !== 'test'){
      console.error(...poruke);
    }
  
  }
  
  module.exports = {info, greska}