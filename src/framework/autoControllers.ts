import fs from 'fs';
import path from 'path';

export function collectControllers(): Function[] {
  const controllers: Function[] = [];
  const cwd = process.cwd();
  const tsDir = path.join(cwd, 'src', 'api', 'controllers');
  const jsDir = path.join(cwd, 'dist', 'api', 'controllers');

  let dir = tsDir;
  if (!fs.existsSync(dir)) {
    dir = jsDir;
    if (!fs.existsSync(dir)) return controllers;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') || f.endsWith('.js'));

  for (const file of files) {
    const full = path.join(dir, file);
    let mod: any;
    try {
      mod = require(full);
    } catch (e) {
      try {
        mod = require(full.replace(/\.(ts|js)$/, ''));
      } catch (e2) {
        continue;
      }
    }

    // collect exported constructors that look like controllers (have metadata)
    for (const key of Object.keys(mod)) {
      const val = mod[key];
      if (typeof val === 'function' && ((val as any).__routes || (val as any).__basePath)) {
        controllers.push(val);
      }
    }

    if (mod.default && typeof mod.default === 'function' && ((mod.default as any).__routes || (mod.default as any).__basePath)) {
      controllers.push(mod.default);
    }
  }

  const seen = new Set<string>();
  return controllers.filter(c => {
    const name = (c as any).name || String(c);
    if (seen.has(name)) return false;
    seen.add(name);
    return true;
  });
}

export default collectControllers;
