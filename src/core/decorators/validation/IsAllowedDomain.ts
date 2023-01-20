import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsAllowedDomain(allowedDomains: string[],validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      constraints: [],
      name: 'IsAllowedDomain',
      target: object.constructor,
      propertyName: propertyName,
      options: { ...validationOptions, message: `$property should belong to the domains: ${allowedDomains.join(', ')}.` },
      validator: {
        validate(value: string, args: ValidationArguments) {
            const [, domain] = value.split('@');
            return allowedDomains.includes(domain);
      }},
    });
  };
}
