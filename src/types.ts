export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

export type Request = {
  method: RequestMethod;
  url: string;
  headers: Record<string, string>;
  body?: string;
};

export type Response = {
  status: number;
  data: string;
};

export type ParseResult = {
  request: Request;
  response: Response;
}[];
