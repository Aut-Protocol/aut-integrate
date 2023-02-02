import AutLoading from "@components/AutLoading";
import { useEffect, useState } from "react";

const checkState = (receivedState) => {
  // const state = sessionStorage.getItem(TWITTER_STATE);
  // return state === receivedState;
  return true;
};

const queryToObject = (query) => {
  const parameters = new URLSearchParams(query);
  return Object.fromEntries(parameters.entries());
};

const Callback = () => {
  useEffect(() => {
    const payload = queryToObject(window.location.search.split("?")[1]);
    window.localStorage.setItem(
      "twitter-auth-response",
      JSON.stringify(payload)
    );
    window.close();
  }, []);

  return (
    <div>
      <AutLoading />
    </div>
  );
};

export default Callback;
