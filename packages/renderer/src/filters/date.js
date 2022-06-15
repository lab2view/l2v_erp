export default (value, time = false) => {
  const date = new Date(value);
  let options = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  };
  if (time) {
    options['hour'] = '2-digit';
    options['minute'] = '2-digit';
    options['second'] = '2-digit';
  }
  return date.toLocaleString(['fr-FR'], options);
};
