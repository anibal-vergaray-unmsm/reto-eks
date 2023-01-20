import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidMonth(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: 'IsValidMonth',
      target: object.constructor,
      propertyName: propertyName,
      options: { ...validationOptions, message: '$property should be a valid month' },
      validator: {
        validate(value: any, args: ValidationArguments) {
            const month = +value
            return month>=1 && month<=12;
      }},
    });
  };
}
