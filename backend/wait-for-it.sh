#!/bin/bash
set -e

host="$1"
shift
cmd="$@"




until nc -z "$host" 3306; do
  echo "Esperando a que MySQL esté listo en $host:3306..."
  sleep 2
done
#instalar el cliente mysql
echo "Instalando cliente mysql..."
apt-get update
apt-get install -y default-mysql-client

# Si ya existe la base de datos, no insertar lavadero.sql
if mysql -h db-mono -u root -proot lavadero -e "SHOW TABLES;" | cat; then
  echo "La base de datos lavadero ya existe, no se insertará lavadero.sql"
  exec $cmd
fi

# Insertar lavadero.sql a la base de datos
echo "Insertando lavadero.sql a la base de datos..."
mysql -h db-mono -u root -proot lavadero < /usr/src/app/lavadero.sql

# Validar si se insertó correctamente
mysql -h db-mono -u root -proot lavadero -e "SHOW TABLES;" | cat



# Iniciar la aplicación
echo "Iniciando la aplicación..."
exec $cmd