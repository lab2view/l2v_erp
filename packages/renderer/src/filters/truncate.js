export default (text, length, suffix) => {
  return (
    text.substring(0, length) + (length < text.length ? suffix || '...' : '')
  );
};
