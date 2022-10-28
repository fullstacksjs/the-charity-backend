/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Express {
  interface Request {
    session: {
      userId: string;
    };
  }
}
