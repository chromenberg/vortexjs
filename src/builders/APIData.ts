export type WithID<T> = { id: number } & T;
export type APIResponse<T> = WithID<T>;

export type CreateDate = { created_at: Date };
export type Created<T> = CreateDate & T;
export type LastSeen = Null<CreateDate>;

export type Null<T> = T | null;
export type PartialNull<T> = {
  [key in keyof T]: Null<T[key]>;
}
export type If<Condition, TrueType, FalseType> = Condition extends true
  ? TrueType
  : FalseType;
