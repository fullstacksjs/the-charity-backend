import type {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ async: false })
export class CannotUseWithout implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as any;
    const required = args.constraints[0] as string;
    return object[required] !== undefined;
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used without \`${args.constraints[0]}\`.`;
  }
}

@ValidatorConstraint({ async: false })
export class CannotUseWith implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as any;
    const result = args.constraints.every(propertyName => {
      return object[propertyName] === undefined;
    });
    return result;
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used with \`${args.constraints.join('` , `')}\`.`;
  }
}
