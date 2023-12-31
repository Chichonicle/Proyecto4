export { }

export interface TokenDecoded {
  id: number,
  role: string,
  email: string
}

declare global {
    namespace Express {
        export interface Request {
            token: TokenDecoded;
        }
    }
}