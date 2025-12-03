export interface IAlert {
  id: string;
  message: string;
  color: "success" | "danger" | "warning" | "info";
}

export interface AlertState {
  alerts: IAlert[];
}
