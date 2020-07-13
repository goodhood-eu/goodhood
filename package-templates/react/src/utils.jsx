import pkg from '@/package.json';
import rootPkg from '@root/package.json';

export const addNumbers = (a, b) => a + b;
export const getRootPackageName = () => rootPkg.name;
export const getPackageName = () => pkg.name;
