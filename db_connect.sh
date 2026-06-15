#!/bin/bash

command -v mysql >/dev/null 2>&1 || {
	echo "Error: 'mysql' not found. Rebuild the dev container: Dev Containers: Rebuild Container"
	exit 127
}

mysql -h database -u appuser -pappsecret portfolio

