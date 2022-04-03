import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsSteamCommunityID() {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isSteamCommunityID',
            target: object.constructor,
            propertyName: propertyName,
            validator: {
                validate(value: any) {
                    return typeof value === 'string' && /^[0-9]{1,20}$/.test(value);
                },

                defaultMessage() {
                    return `SteamID must be a string representing a uint64`;
                }
            }
        });
    };
}
