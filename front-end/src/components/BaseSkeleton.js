import "../App.css";

const BaseSkeleton = (type) => {
  const classes = `skeleton ${type}`;
  return <div className={classes}></div>;
};

export default BaseSkeleton;
