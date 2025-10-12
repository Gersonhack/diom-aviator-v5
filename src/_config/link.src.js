
const links = [
  '/src/assents/css/pages/loginPage.css',
  
  
  
];

links.forEach((link) => {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = link;
  document.head.appendChild(stylesheet);
});