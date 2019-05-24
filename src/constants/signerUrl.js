const getUrl = () => process.env.REACT_APP_TARGET_ENV === "production"
  ? "https://gn80ai4ca2.execute-api.us-east-1.amazonaws.com/prod/"
  : "https://gn80ai4ca2.execute-api.us-east-1.amazonaws.com/prod/"

export default getUrl();
