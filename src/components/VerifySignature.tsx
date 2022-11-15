import { verifyTweetRequest } from "@api/aut.api";
import { Alert, debounce, Link, styled, Typography } from "@mui/material";
import { pxToRem } from "@utils/text-size";
import { useWeb3React } from "@web3-react/core";
import { useState, useRef, useMemo, useEffect } from "react";
import AutLoading from "./AutLoading";
import { AutButton } from "./buttons";
import DialogWrapper from "./Dialog/DialogWrapper";
import { AutTextField } from "./Fields";
import { ReactComponent as CutLogo } from "@assets/aut/cut.svg";

const Title = styled(Typography)`
  letter-spacing: 5px;
  font-weight: bold;
  color: white;
  text-align: center;
  text-transform: uppercase;
  font-size: ${pxToRem(45)};
  margin-bottom: ${pxToRem(10)};
  margin-top: ${pxToRem(20)};
`;

const message = "I should own this tweet %40aut-labs";

const Subtitle = styled(Typography)({
  letterSpacing: "1.25px",
  textAlign: "center",
  color: "white",
  fontSize: "1.125rem"
  // textTransform: "uppercase"
});

const DialogInnerContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
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
      setSigned(true);
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
          params: [message, account]
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
    <DialogWrapper
      open={open}
      onClose={closeDialog}
      contentSx={{
        borderImage: null,
        borderWidth: null,
        maxWidth: pxToRem(780),
        minWidth: pxToRem(780),
        minHeight: pxToRem(550)
      }}
    >
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
                  <Title>Verify your Signature</Title>
                  <CutLogo width="100%" />
                  <DialogInnerContent>
                    <Subtitle>
                      Tweet a message to prove that you control this address.
                      <br />
                      Return back to this page afterwards to complete
                      verification.
                    </Subtitle>
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
                        sx={{
                          width: pxToRem(420),
                          height: pxToRem(70)
                        }}
                        type="submit"
                        color="primary"
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
                  <Title>Verify your Tweet</Title>
                  <CutLogo width="100%" />
                  <DialogInnerContent>
                    <div>
                      <Subtitle
                        sx={{
                          marginBottom: pxToRem(50)
                        }}
                      >
                        Paste the URL of the tweet you just posted
                      </Subtitle>
                      <AutTextField
                        required
                        variant="outlined"
                        focused
                        inputRef={input}
                        defaultValue={tweetUrl || ""}
                        width="450"
                        disabled={loading}
                        autoFocus
                        sx={{
                          ".MuiInputBase-root": {
                            height: pxToRem(65)
                          }
                        }}
                        placeholder="twitter.com/username/status/123456"
                        onChange={debouncedChangeHandler}
                        inputProps={{ maxLength: 20 }}
                      />
                    </div>
                    <AutButton
                      onClick={() => verifyTweet()}
                      sx={{
                        width: pxToRem(420),
                        height: pxToRem(70)
                      }}
                      type="submit"
                      color="primary"
                      variant="outlined"
                    >
                      Verify
                    </AutButton>
                  </DialogInnerContent>
                </>
              )}
              {signed && (
                <>
                  <Title>Thank you</Title>
                  <CutLogo width="100%" />
                  <DialogInnerContent>
                    <Subtitle>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam <br /> nonumy eirmod tempor invidunt ut labore et
                      dolore magna
                    </Subtitle>
                    <AutButton
                      onClick={() => closeDialog()}
                      sx={{
                        width: pxToRem(320),
                        height: pxToRem(70)
                      }}
                      type="submit"
                      color="primary"
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
