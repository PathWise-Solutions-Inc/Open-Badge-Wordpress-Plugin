import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, rmSync } from 'fs';
import { resolve } from 'path';
import archiver from 'archiver';
import fs from 'fs';

const pluginName = 'pathwise-badge-connect';
const distFolder = resolve('dist');
const buildFolder = resolve('build');
const outputFilePath = resolve(distFolder, `${pluginName}.zip`);

console.log('Cleaning up old builds...');
rmSync(distFolder, { recursive: true, force: true });
mkdirSync(distFolder, { recursive: true });
rmSync(buildFolder, { recursive: true, force: true });

console.log('Running build process...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Preparing plugin files...');
const pluginFolder = resolve(distFolder, pluginName);
mkdirSync(pluginFolder, { recursive: true });

// Copy built files
console.log('Copying built files...');
fs.cpSync(buildFolder, resolve(pluginFolder, 'build'), { recursive: true });

// Copy plugin core files and folders
console.log('Copying core plugin files...');
const coreFilesAndFolders = [
    'includes',
    'public',
    'src/samples',
    'class-pbc-plugin.php',
    'pathwise-badge-connect.php',
    'README.md',
];
coreFilesAndFolders.forEach((item) => {
    const source = resolve(item);
    const destination = resolve(pluginFolder, item);
    if (fs.existsSync(source)) {
        mkdirSync(resolve(destination, '..'), { recursive: true });
        fs.cpSync(source, destination, { recursive: true });
    }
});

// Create a zip archive
console.log('Creating zip archive...');
const output = fs.createWriteStream(outputFilePath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
    console.log(`Plugin built and zipped successfully: ${outputFilePath}`);
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);
archive.directory(pluginFolder, false);
archive.finalize();
