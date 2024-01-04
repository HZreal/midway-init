/*
To hash a str like password:
 */
// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';

const saltRounds = 10;
const hashSalt = bcrypt.genSaltSync(saltRounds);

// 取哈希
export const getHash = async plaintext => {
    return await bcrypt.hash(plaintext, saltRounds);
};

// hash核验
export const hashCheck = async (plaintext, ciphertext) => {
    return await bcrypt.compare(plaintext, ciphertext);
};

/*

 */
export class StringHash {
    // salt: hashSalt

    public async hashPassword(plaintext) {
        return await bcrypt.hash(plaintext, hashSalt);
    }

    public async checkPassword(plaintext, passwordHash) {
        return await bcrypt.compare(plaintext, passwordHash);
    }
}
