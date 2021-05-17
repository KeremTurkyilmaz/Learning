console.log('Client Side Javascript');

const weatherForm = document.getElementById('weather-form');
const search = document.getElementById('search');

const report = document.getElementById('report');
const error = document.getElementById('error');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  report.textContent = 'Loading...';
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) report.textContent = data.error;
        else {
          console.log(data);
          report.textContent = `
            ${data.location} - \n ${data.forecast}  
          `;
        }
      });
    }
  );
});
