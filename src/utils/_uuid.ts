import { v4 as uuidv4 } from 'uuid';

export const getUuid = async (): Promise<string> => {
    return uuidv4();
};
