const { exec } = require('child_process');
const core = require('@actions/core');

exec('git ls-remote --tags origin', (error, stdout, stderr) => {
  if (error) {
    core.setFailed(`Error fetching tags: ${error.message}`);
    return;
  }
  if (stderr) {
    core.setFailed(`Error: ${stderr}`);
    return;
  }
  
  const tags = stdout.split('\n')
    .map(line => line.match(/refs\/tags\/(.+)$/))
    .filter(Boolean)
    .map(match => match[1]);

  core.setOutput('tags', tags.join(','));
});
