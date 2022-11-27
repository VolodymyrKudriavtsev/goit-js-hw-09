const refs = {
  timer: document.querySelector('.timer'),
  fields: document.querySelectorAll('.field'),
};

// ----------STYLES-------------
const timerStyles = refs.timer.style;
timerStyles.gap = '10px';
timerStyles.display = 'flex';
timerStyles.marginTop = '20px';
refs.fields.forEach(field => {
  console.log(field.firstElementChild.style);
  const valueStyles = field.firstElementChild.style;
  const labelStyles = field.lastElementChild.style;
  valueStyles.fontSize = '30px';
  valueStyles.fontWeight = '500';
  valueStyles.display = 'block';
  valueStyles.textAlign = 'center';
  labelStyles.fontSize = '15px';
  labelStyles.textTransform = 'uppercase';
});
