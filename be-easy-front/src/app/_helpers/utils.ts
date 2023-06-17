export enum ROLES {
    ROLE_URBAN = 'ROLE_URBAN',
    ROLE_ADVENTURE = 'ROLE_ADVENTURE',
    ROLE_AMATEUR = 'ROLE_AMATEUR'
}

export const variabilityConfig = {
    [ROLES.ROLE_URBAN]: {
        map: false,
        additionalData: false
    },
    [ROLES.ROLE_AMATEUR]: {
        map: false,
        additionalData: true
    },
    [ROLES.ROLE_ADVENTURE]: {
        map: true,
        additionalData: false
    }
}

export function getEnumValueRole(role: string) {
    let role_enum;
    if (role === ROLES.ROLE_ADVENTURE) {
        role_enum = ROLES.ROLE_ADVENTURE
    }

    if (role === ROLES.ROLE_AMATEUR) {
        role_enum = ROLES.ROLE_AMATEUR
    }

    if (role === ROLES.ROLE_URBAN) {
        role_enum = ROLES.ROLE_URBAN
    }

    return role_enum;
}