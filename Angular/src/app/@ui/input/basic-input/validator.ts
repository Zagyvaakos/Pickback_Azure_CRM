export interface Validator {
    required?: boolean;
    maxlength?: number;
    min?: number | null;
    max?: number | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pattern?: any; // TODO: Regexp-re átírni
}
