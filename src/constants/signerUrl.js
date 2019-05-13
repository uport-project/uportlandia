const getUrl = () => process.env.REACT_APP_TARGET_ENV === "production"
  ? "https://gn80ai4ca2.execute-api.us-east-1.amazonaws.com/prod/"
  : process.env.REACT_APP_TARGET_ENV === "state"
    ? "https://gn80ai4ca2.execute-api.us-east-1.amazonaws.com/prod/"
    : "http://localhost:3001/"

export default getUrl();
