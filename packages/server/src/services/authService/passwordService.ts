import bcrypt from 'bcrypt';





const saltRounds = 2;

export async function hashPassword(password: string) {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;

}

export async function comparePasswords(plaintext: string, storedHash: string) {
    const result = await bcrypt.compare(plaintext, storedHash);
    return result;
 
}
