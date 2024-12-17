export class HTTPError extends Error {
  constructor(
    public status: number,
    override message: string,
  ) {
    super(message);
  }
}
