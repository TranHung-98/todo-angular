import { EOptionStatusTodo, EOptionDisplay } from './../enums/select-option-value.enum';

export const OptionEditCreate = [
  { key: EOptionDisplay.Status, value: EOptionStatusTodo.Status },
  { key: EOptionDisplay.InProgress, value: EOptionStatusTodo.InProgress },
  { key: EOptionDisplay.Completed, value: EOptionStatusTodo.Completed },
  { key: EOptionDisplay.NotStarted, value: EOptionStatusTodo.NotStarted }
];

export const OptionFilter = [
  { key: EOptionDisplay.Status, value: EOptionStatusTodo.Status },
  { key: EOptionDisplay.All, value: EOptionStatusTodo.All },
  { key: EOptionDisplay.Completed, value: EOptionStatusTodo.Completed },
  { key: EOptionDisplay.NotStarted, value: EOptionStatusTodo.NotStarted }
];
