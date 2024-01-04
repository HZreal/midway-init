/**
 * @author sizhong
 * @date 2023-04-18
 */
export const sleep = async ms => {
    return new Promise(r => setTimeout(r, ms));
};
