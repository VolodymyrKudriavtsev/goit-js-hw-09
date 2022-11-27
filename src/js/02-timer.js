const refs = {
  timer: document.querySelector('.timer'),
  fields: document.querySelectorAll('.field'),
};

// ----------STYLES-------------
refs.timer.style.display = 'flex';
refs.timer.style.gap = '10px';
refs.timer.style.marginTop = '20px';
refs.fields.forEach(field => {
  const value = field.querySelector('.value');
  const label = field.querySelector('.label');
  value.style.fontSize = '30px';
  value.style.fontWeight = '500';
  value.style.display = 'block';
  value.style.textAlign = 'center';
  label.style.fontSize = '15px';
  label.style.textTransform = 'uppercase';
});
