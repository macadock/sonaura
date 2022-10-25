import { asNexusMethod } from 'nexus';
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';

export const jsonScalar = asNexusMethod(JSONObjectResolver, 'json');
export const dateTimeScalar = asNexusMethod(DateTimeResolver, 'date');
