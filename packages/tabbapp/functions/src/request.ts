import { Request } from "express"
export interface AuthedRequest extends Request {
  locals: any
}
