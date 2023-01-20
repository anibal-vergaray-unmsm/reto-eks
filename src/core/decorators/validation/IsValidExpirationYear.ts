import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidExpirationYear(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: 'IsValidExpirationYear',
      target: object.constructor,
      propertyName: propertyName,
      options: { ...validationOptions, message: '$property should be greater than or equal to the current year and less than or equal to 5 years from now.' },
      validator: {
        validate(value: any, args: ValidationArguments) {
            const expirationYear = +value;
            const minYear = (new Date()).getFullYear();
            const maxYear = minYear + 5;
            return expirationYear >= minYear && expirationYear <=maxYear;
      }},
    });
  };
}
