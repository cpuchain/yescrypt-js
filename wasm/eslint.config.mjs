import tseslint from 'typescript-eslint';
import { getConfig } from '@cpuchain/eslint';

export default tseslint.config(getConfig());
