import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { CustomException } from "./CustomException";

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    response.status(exception.statusCode).json({
      ...exception.details,
      error: exception.message || 'Internal server error',
      statusCode: exception.statusCode || 500,
    });
  }
}
