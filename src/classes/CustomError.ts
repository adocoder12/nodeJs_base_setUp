export default class CustomError extends Error {
  public readonly status: number;

  constructor(message: string, status: number = 400) {
    // Provide a default value
    super(message);
    this.status = status;
    this.name = this.constructor.name; // Optionally set the name explicitly
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
