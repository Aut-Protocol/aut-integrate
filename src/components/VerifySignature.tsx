import { verifyTweetRequest } from "@api/aut.api";
import { Alert, debounce, Link, styled, Typography } from "@mui/material";
import { pxToRem } from "@utils/text-size";
import { useWeb3React } from "@web3-react/core";
import { useState, useRef, useMemo, useEffect } from "react";
import AutLoading from "./AutLoading";
import { AutButton } from "./buttons";
import DialogWrapper from "./Dialog/DialogWrapper";
import { AutTextField } from "@theme/field-text-styles";
import AppTitle from "./AppTitle";

const message = "I should own this tweet %40aut-labs";

const DialogInnerContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  textAlign: "center",
  flex: 1
});

function truncate(input) {
  if (input.length > 120) {
    return input.substring(0, 120) + "...";
  }
  return input;
}

const VerifySignature = ({ onClose = (_: boolean) => null, open }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { provider, account } = useWeb3React();
  const [signature, setSignature] = useState(null);
  const [tweetUrl, setTweetUrl] = useState("");
  const [tweetPosted, setTweetPosted] = useState(null);
  const [signed, setSigned] = useState(null);
  const input = useRef();

  const postTweet = () => {
    window.open(
      `http://twitter.com/intent/tweet?text=${`${message}${signature}`.replace(
        "/s+/g",
        "%20"
      )}`,
      "_blank"
    );
    setTweetPosted(true);
  };

  const verifyTweet = async () => {
    try {
      setErrorMessage(null);
      setLoading(true);
      console.log(tweetUrl, "tweetUrl");
      const tweetParts = tweetUrl.split("/");
      const tweetID = tweetParts[tweetParts.length - 1];
      await verifyTweetRequest(signature, tweetID);
      setLoading(false);
      setSigned(true);
    } catch (err) {
      setLoading(false);
      setSigned(false);
      setErrorMessage(err?.message);
    }
  };

  const closeDialog = () => {
    onClose(signed);
  };
  const sign = async () => {
    setErrorMessage(null);
    setLoading(true);
    if (!signature) {
      try {
        setLoading(true);
        const res = await provider.provider.request({
          method: "personal_sign",
          params: ["Āut Labs", account]
        });
        setSignature(res);
        setLoading(false);
      } catch (error) {
        setErrorMessage(error?.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const debouncedChangeHandler = useMemo(() => {
    const changeHandler = (e) => {
      setTweetUrl(e?.target?.value);
    };
    return debounce(changeHandler, 10);
  }, []);

  useEffect(() => {
    sign();
  }, []);

  return (
    <DialogWrapper open={open} onClose={closeDialog}>
      <>
        <>
          {loading ? (
            <DialogInnerContent
              style={{
                position: "relative"
              }}
            >
              <AutLoading />
            </DialogInnerContent>
          ) : (
            <>
              {signature && !signed && !tweetPosted && (
                <>
                  <AppTitle
                    mb={{
                      xs: "16px",
                      lg: "24px",
                      xxl: "32px"
                    }}
                    variant="h2"
                  />
                  <Typography color="white" variant="subtitle1">
                    Verify your Signature
                  </Typography>
                  <DialogInnerContent>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <Typography color="white" mb="10px" variant="body">
                        Tweet a message to prove that you control this address.
                      </Typography>
                      <Typography color="white" variant="body">
                        Return back to this page afterwards to complete
                        verification.
                      </Typography>
                    </span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gridGap: "15px"
                      }}
                    >
                      <AutButton
                        onClick={() => postTweet()}
                        type="submit"
                        color="offWhite"
                        size="normal"
                        variant="outlined"
                      >
                        Post Proof on Twitter
                      </AutButton>
                      <Link
                        type="button"
                        sx={{
                          color: "white",
                          cursor: "pointer",
                          fontSize: pxToRem(16)
                        }}
                        onClick={() => closeDialog()}
                      >
                        Sign without verifying
                      </Link>
                    </div>
                  </DialogInnerContent>
                </>
              )}
              {signature && !signed && tweetPosted && (
                <>
                  <AppTitle
                    mb={{
                      xs: "16px",
                      lg: "24px",
                      xxl: "32px"
                    }}
                    variant="h2"
                  />
                  <Typography color="white" variant="subtitle1">
                    Verify your Tweet
                  </Typography>
                  <DialogInnerContent>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <Typography mb="20px" color="white" variant="body">
                        Paste the URL of the tweet you just posted
                      </Typography>
                      <AutTextField
                        required
                        variant="outlined"
                        color="offWhite"
                        focused
                        inputRef={input}
                        defaultValue={tweetUrl || ""}
                        disabled={loading}
                        autoFocus
                        placeholder="twitter.com/username/status/123456"
                        onChange={debouncedChangeHandler}
                      />
                    </div>
                    <AutButton
                      onClick={() => verifyTweet()}
                      type="submit"
                      color="offWhite"
                      size="normal"
                      variant="outlined"
                    >
                      Verify
                    </AutButton>
                  </DialogInnerContent>
                </>
              )}
              {signed && (
                <>
                  <AppTitle
                    mb={{
                      xs: "16px",
                      lg: "24px",
                      xxl: "32px"
                    }}
                    variant="h2"
                  />
                  <Typography color="white" variant="subtitle1">
                    Thank you
                  </Typography>
                  <DialogInnerContent>
                    <Typography mb="20px" color="white" variant="body">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam <br /> nonumy eirmod tempor invidunt ut labore et
                      dolore magna
                    </Typography>
                    <AutButton
                      onClick={() => closeDialog()}
                      type="submit"
                      color="offWhite"
                      size="normal"
                      variant="outlined"
                    >
                      Close window
                    </AutButton>
                  </DialogInnerContent>
                </>
              )}
            </>
          )}

          {!loading && errorMessage && (
            <Alert
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
                display: "flex",
                alignItems: "center"
              }}
              severity="error"
            >
              {truncate(errorMessage)}
            </Alert>
          )}
        </>
      </>
    </DialogWrapper>
  );
};

export default VerifySignature;
