if (process.argv.length < 3) {
    console.error('Usage: ' + process.argv.join(' ') + ' <script name>');
    process.exit(1);
}

let absPath = __dirname + '/../scripts/' + process.argv[2] + '.js';
if (!require('fs').existsSync(absPath)) {
    console.error('Script not found: ' + absPath);
    process.exit(1);
}

require('../scripts/' + process.argv[2])(() => process.exit());
