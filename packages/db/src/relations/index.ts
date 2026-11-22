// One file per domain, mirroring `../schema/`.
//
// Rules:
// 1. A file owns every relation whose source table belongs to its domain, in both
//    directions, and may point at tables from other domains. Drizzle keys relations by
//    source table and the merge below is a shallow spread, so two files defining the same
//    table key silently overwrite each other.
// 2. The main `defineRelations` file must be spread first. Every other file uses
//    `defineRelationsPart` and is spread after it. The reverse order drops relation info
//    without any type or runtime error.
import { authRelations } from './auth';

export const relations = { ...authRelations };
