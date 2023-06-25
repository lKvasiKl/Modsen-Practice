type THttpMethod = "POST" | "GET";

export interface IRequestParams {
  headers?: Record<string, string>;
  method: THttpMethod;
  url: string;
  data?: unknown;
  params?: Record<string, string>;
}

export interface IAppButtonProps {
  children: React.ReactNode;
  color: "primary" | "secondary";
  onClick: () => void;
}

export interface IPlaceCardProps {
  image?: string;
  icon?: string;
  name: string;
  description: string;
}

export interface IAuthProps {
  email: string;
  password: string;
}

export interface IFormProps {
  email: string;
  password: string;
}
