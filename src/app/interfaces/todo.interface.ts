export interface ITodo {
  id: string;
  todo: string;
  date: string;
  status: string;
  isChecked: boolean,
  countdown?: number | string;
  deadlineNotificationSent?: boolean;
  fiveNotificationSent?: boolean;
}

export interface ITodo1 {
  id: string;
  name: string;
  end: string;
  status: string;
  isChecked: boolean,
  countdown?: number | string;
}
