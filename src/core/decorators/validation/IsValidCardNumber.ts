import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { luhnValidator } from 'src/core/utils/luhn';

export function IsValidCardNumber(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: 'IsValidCardNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: { ...validationOptions, message: '$property should be a valid card number' },
      validator: {
        validate(value: any, args: ValidationArguments) {
            return luhnValidator(value);
      }},
    });
  };
}
