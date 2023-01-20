import { registerDecorator, ValidationOptions, ValidationArguments, buildMessage } from 'class-validator';
import { luhnValidator } from 'src/core/utils/luhn';

export function IsValidCVVOf(cardNumberField: string,validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: 'IsValidCVV',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
            const cardNumber = (args.object as any)[cardNumberField];
            const isValidCard = luhnValidator(cardNumber);
            const firstDigit = cardNumber.charAt(0);

            return isValidCard? 
                    firstDigit === '3'? // American Express card
                        value.length === 4
                        : value.length === 3
                    : value.length>=3 && value.length<=4;
      },
      defaultMessage: buildMessage(
        (eachPrefix: string, args: ValidationArguments ) => {
            const cardNumber = (args.object as any)[cardNumberField];
            const isValidCard = luhnValidator(cardNumber);
            return isValidCard? 
                '$property should be 4 digits for American Express and 3 digits for Visa or MasterCard'
                : '$property length should be greater than or equal to 3 and less than or equal to 4';
        },
        validationOptions
      ),
    }, 
    });
  };
}
