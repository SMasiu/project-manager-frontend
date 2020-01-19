import { UserType } from "src/app/shared/types/user.type";

export interface MemberType {
    user: UserType;
    permission: number;
}