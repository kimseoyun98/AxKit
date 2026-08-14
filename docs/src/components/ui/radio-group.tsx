/**
 * @file ui:radio-group
 * @requires @seed-design/react@^2.0.0
 * @requires @seed-design/css@^2.0.0
 **/

import { IconExclamationmarkCircleFill } from "@karrotmarket/react-monochrome-icon";
import {
  RadioGroup as SeedRadioGroup,
  RadioGroupField as SeedRadioGroupField,
  PrefixIcon,
  VisuallyHidden,
} from "@seed-design/react";
import type { FieldLabelVariantProps } from "@seed-design/css/recipes/field-label";
import { radioGroup, type RadioGroupVariantProps } from "@seed-design/css/recipes/radio-group";
import * as React from "react";

export interface RadioGroupProps extends SeedRadioGroupField.RootProps {
  label?: React.ReactNode;
  /**
   * @default "medium"
   */
  labelWeight?: FieldLabelVariantProps["weight"];
  indicator?: React.ReactNode;
  showRequiredIndicator?: boolean;

  description?: React.ReactNode;
  errorMessage?: React.ReactNode;

  size?: "medium" | "large";
  weight?: "regular" | "bold";
  tone?: "neutral" | "brand";
}

const RadioGroupContext = React.createContext<{ size?: "medium" | "large"; weight?: "regular" | "bold"; tone?: "neutral" | "brand" }>({});

/**
 * @see https://seed-design.io/react/components/radio-group
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      label,
      labelWeight,
      indicator,
      showRequiredIndicator,

      description,
      errorMessage,

      size = "medium",
      weight = "regular",
      tone = "neutral",

      children,

      ...props
    },
    ref,
  ) => {
    const [variantProps, restProps] = radioGroup.splitVariantProps(props);

    if (
      process.env.NODE_ENV !== "production" &&
      !label &&
      !restProps["aria-label"] &&
      !restProps["aria-labelledby"]
    ) {
      console.warn(
        "RadioGroup component requires a `label`, `aria-label` or `aria-labelledby` attribute.",
      );
    }

    const renderErrorMessage = errorMessage && restProps.invalid;
    const renderFooter = description || renderErrorMessage;

    return (
      <RadioGroupContext.Provider value={{ size, weight, tone }}>
        <SeedRadioGroupField.Root ref={ref} {...restProps}>
          {(label || indicator) && (
            <SeedRadioGroupField.Header>
              <SeedRadioGroupField.Label weight={labelWeight}>
                {label}
                {showRequiredIndicator && <SeedRadioGroupField.RequiredIndicator />}
                {indicator && (
                  <SeedRadioGroupField.IndicatorText>{indicator}</SeedRadioGroupField.IndicatorText>
                )}
              </SeedRadioGroupField.Label>
            </SeedRadioGroupField.Header>
          )}
          <SeedRadioGroup.Root {...variantProps}>{children}</SeedRadioGroup.Root>
          {renderFooter && (
            <SeedRadioGroupField.Footer>
              {description &&
                (renderErrorMessage ? (
                  <VisuallyHidden asChild>
                    <SeedRadioGroupField.Description>{description}</SeedRadioGroupField.Description>
                  </VisuallyHidden>
                ) : (
                  <SeedRadioGroupField.Description>{description}</SeedRadioGroupField.Description>
                ))}
              {renderErrorMessage && (
                <SeedRadioGroupField.ErrorMessage>
                  <PrefixIcon svg={<IconExclamationmarkCircleFill />} />
                  {errorMessage}
                </SeedRadioGroupField.ErrorMessage>
              )}
            </SeedRadioGroupField.Footer>
          )}
        </SeedRadioGroupField.Root>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps extends SeedRadioGroup.ItemProps {
  label?: React.ReactNode;

  size?: "medium" | "large";

  weight?: "regular" | "bold";

  tone?: "neutral" | "brand";

  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;

  rootRef?: React.Ref<HTMLLabelElement>;
}

import { radio } from "@seed-design/css/recipes/radio";
import { radiomark } from "@seed-design/css/recipes/radiomark";

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ label, inputProps, rootRef, size: itemSize, weight: itemWeight, tone: itemTone, className, ...otherProps }, ref) => {
    const ctx = React.useContext(RadioGroupContext);
    const size = itemSize ?? ctx.size ?? "medium";
    const weight = itemWeight ?? ctx.weight ?? "regular";
    const tone = itemTone ?? ctx.tone ?? "neutral";

    const radioRecipe = radio({ size, weight });
    const radiomarkRecipe = radiomark({ size, tone });

    const isLarge = size === "large";

    return (
      <SeedRadioGroup.Item
        ref={rootRef}
        size={size}
        className={[radioRecipe.root, className].filter(Boolean).join(" ")}
        style={{
          minHeight: isLarge ? 48 : 36,
          padding: isLarge ? "8px 0" : "4px 0",
        }}
        {...otherProps}
      >
        <SeedRadioGroup.ItemControl
          size={size}
          className={radiomarkRecipe.root}
          style={{
            width: isLarge ? 24 : 18,
            height: isLarge ? 24 : 18,
          }}
        >
          <SeedRadioGroup.ItemIndicator
            size={size}
            className={radiomarkRecipe.icon}
            checked={
              <svg aria-hidden="true" viewBox="0 0 24 24" style={{ width: isLarge ? 12 : 9, height: isLarge ? 12 : 9 }}>
                <circle cx="12" cy="12" r="12" fill="currentColor" />
              </svg>
            }
          />
        </SeedRadioGroup.ItemControl>
        {label && (
          <SeedRadioGroup.ItemLabel
            size={size}
            weight={weight}
            className={radioRecipe.label}
            style={{
              fontSize: isLarge ? 17 : 14,
              fontWeight: weight === "bold" ? 700 : 400,
            }}
          >
            {label}
          </SeedRadioGroup.ItemLabel>
        )}
        <SeedRadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
      </SeedRadioGroup.Item>
    );
  },
);
RadioGroupItem.displayName = "RadioGroupItem";

export interface RadiomarkProps extends SeedRadioGroup.ItemControlProps {}

/**
 * @see https://seed-design.io/react/components/radio-group
 */
export const Radiomark = React.forwardRef<HTMLDivElement, RadiomarkProps>((props, ref) => {
  return (
    <SeedRadioGroup.ItemControl ref={ref} {...props}>
      <SeedRadioGroup.ItemIndicator
        checked={
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="currentColor" />
          </svg>
        }
      />
    </SeedRadioGroup.ItemControl>
  );
});
Radiomark.displayName = "Radiomark";

/**
 * @deprecated Use `Radiomark` instead. Will be removed in @seed-design/react@2.0.0.
 */
export const RadioMark = Radiomark;

/**
 * @deprecated Use `RadiomarkProps` instead. Will be removed in @seed-design/react@2.0.0.
 */
export type RadioMarkProps = RadiomarkProps;

/**
 * This file is a snippet from SEED Design, helping you get started quickly with @seed-design/* packages.
 * You can extend this snippet however you want.
 */
