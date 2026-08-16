/**
 * @file ui:time-picker
 * @requires @seed-design/react@^2.0.0
 * @requires @seed-design/css@^2.0.0
 **/

import {
  TimePicker as SeedTimePicker,
  type TimePickerProps as SeedTimePickerProps,
  type TimePickerValue as SeedTimePickerValue,
} from "@seed-design/react";

export interface TimePickerProps extends SeedTimePickerProps {}
export type TimePickerValue = SeedTimePickerValue;

/**
 * @see https://seed-design.io/react/components/time-picker
 */
export const TimePicker = SeedTimePicker;

/**
 * This file is a snippet from SEED Design, helping you get started quickly with @seed-design/* packages.
 * You can extend this snippet however you want.
 */
