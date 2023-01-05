/* eslint-disable max-len */
import { AutButton } from "@components/buttons";
import { AutTextField, FormHelperText } from "@components/Fields";
import AFileUpload from "@components/FileUpload";
import { StepperButton } from "@components/Stepper";
import { StepperChildProps } from "@components/Stepper/model";
import VerifySignature from "@components/VerifySignature";
import { styled } from "@mui/material";
import {
  IntegrateCommunity,
  integrateUpdateCommunity
} from "@store/Integrate/integrate";
import { useAppDispatch } from "@store/store.model";
import { countWords } from "@utils/helpers";
import { pxToRem } from "@utils/text-size";
import { toBase64 } from "@utils/to-base-64";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const errorTypes = {
  maxWords: `Words cannot be more than 3`,
  maxNameChars: `Characters cannot be more than 24`,
  maxLength: `Characters cannot be more than 280`
};

const StepWrapper = styled("form")({
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
});

const CommunityInfoStep = (props: StepperChildProps) => {
  const dispatch = useAppDispatch();
  const [openVerify, setOpenVerify] = useState(false);
  const [verified, setVerified] = useState(false);
  const { name, image, description, daoTweetUrl } =
    useSelector(IntegrateCommunity);
  const { control, handleSubmit, getValues, watch, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      name,
      image,
      description,
      daoTweetUrl
    }
  });

  const values = watch();

  const updateState = () => {
    return dispatch(integrateUpdateCommunity(getValues()));
  };

  const onSubmit = async () => {
    await updateState();
    props?.stepper?.nextStep();
  };

  return (
    <StepWrapper autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {openVerify && (
        <VerifySignature
          onClose={(ver) => {
            setVerified(ver);
            setOpenVerify(false);
          }}
          open={openVerify}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end"
        }}
      >
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <AFileUpload
                  initialPreviewUrl={image}
                  fileChange={async (file) => {
                    if (file) {
                      onChange(await toBase64(file));
                    } else {
                      onChange(null);
                    }
                  }}
                />
              </div>
            );
          }}
        />
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
            validate: {
              maxNameChars: (v) => v.length <= 24,
              maxWords: (v: string) => countWords(v) <= 3
            }
          }}
          render={({ field: { name, value, onChange } }) => {
            return (
              <AutTextField
                width="330"
                variant="standard"
                required
                autoFocus
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder="Community Name"
                helperText={
                  <FormHelperText
                    errorTypes={errorTypes}
                    value={value}
                    name={name}
                    errors={formState.errors}
                  >
                    <span>
                      {3 - countWords(value)}/3 words and{" "}
                      {24 - (value?.length || 0)}/24 characters left
                    </span>
                  </FormHelperText>
                }
              />
            );
          }}
        />
      </div>

      <Controller
        name="description"
        control={control}
        rules={{ maxLength: 280 }}
        render={({ field: { name, value, onChange } }) => {
          return (
            <AutTextField
              width="450"
              name={name}
              value={value || ""}
              onChange={onChange}
              color="primary"
              multiline
              rows={5}
              sx={{
                mt: pxToRem(45)
              }}
              placeholder="Introduce your community to the world. It can be a one-liner, common values, goals, or even the story behind it!"
              helperText={
                <FormHelperText
                  errorTypes={errorTypes}
                  value={value}
                  name={name}
                  errors={formState.errors}
                >
                  <span>{280 - (value?.length || 0)}/280 characters left</span>
                </FormHelperText>
              }
            />
          );
        }}
      />

      <div
        style={{
          display: "flex",
          gridGap: pxToRem(20),
          marginTop: pxToRem(45)
        }}
      >
        <Controller
          name="daoTweetUrl"
          control={control}
          render={({ field: { name, value, onChange } }) => {
            return (
              <AutTextField
                width="290"
                variant="standard"
                name={name}
                value={value || ""}
                onChange={onChange}
                placeholder="Add Twitter"
              />
            );
          }}
        />
        <AutButton
          onClick={() => setOpenVerify(true)}
          sx={{
            width: pxToRem(140),
            height: pxToRem(48),
            "&.MuiButton-root": {
              borderRadius: 0,
              borderWidth: "1px"
            }
          }}
          type="button"
          color="primary"
          disabled={!values.daoTweetUrl}
          variant="outlined"
        >
          Verify
        </AutButton>
      </div>
      <StepperButton
        label="Next"
        disabled={!formState.isValid || !values.image}
      />
    </StepWrapper>
  );
};

export default CommunityInfoStep;
