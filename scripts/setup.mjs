#!/usr/bin/env node
import { spawnSync } from 'child_process';

const args = process.argv.slice(2);
const res = spawnSync('node', ['scripts/setup-advanced.mjs', ...args], { stdio: 'inherit' });
process.exit(res.status || 0);
