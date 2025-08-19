#!/bin/bash

LOCKFILE="./yarn.lock"

#!/bin/bash

exec 200>./yarn.lock || exit 1
flock -n 200 || { echo "Another instance is running. Exiting."; exit 1; }

# Your script's main operations go here
echo "Script is running with flock..."
sleep 30
