/* HttpError based on the HttpException of nestjs */
export class HttpError extends Error {
  constructor(
    private readonly response: string | string[],
    private readonly httpStatusCode: number,
  ) {
    super();
    this.initName();
    this.initMessage();
  }

  private initMessage() {
    if (typeof this.response === 'string') {
      this.message = this.response;
    } else if (this.constructor) {
      this.message = this.constructor.name
          .match(/[A-Z][a-z]+|[0-9]+/g)
          .join(' ');
    }
  }

  private initName(): void {
    this.name = this.constructor.name;
  }

  public getStatus(): { http: number } {
    return {
      http: this.httpStatusCode,
    };
  }

  public getResponse(): string | string[] {
    return this.response;
  }
}
