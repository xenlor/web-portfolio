#!/usr/bin/env bash
# Compila y publica la web en el contenedor que la sirve.
#
# El TLS y el dominio los pone el proxy inverso: aqui solo se dejan ficheros.
# El contenedor sirve /var/www/xenlor.dev por HTTP plano y nada mas.
set -euo pipefail

HOST="${DEPLOY_HOST:-proxmox}"   # alias de ~/.ssh/config, nunca una IP
CT="${DEPLOY_CT:-114}"
BASE=/var/www/xenlor.dev

cd "$(dirname "$0")/.."
npm run build

echo "==> empaquetando"
# -m evita el aviso "time stamp is in the future" cuando el reloj del equipo
# que compila va unas decimas por delante del que recibe.
tar -czf /tmp/xenlor-dist.tar.gz -C dist .

echo "==> subiendo al contenedor $CT de $HOST"
scp -q /tmp/xenlor-dist.tar.gz "$HOST:/tmp/xenlor-dist.tar.gz"
ssh "$HOST" "
  set -e
  pct push $CT /tmp/xenlor-dist.tar.gz /tmp/dist.tar.gz
  pct exec $CT -- bash -c '
    rm -rf $BASE/*
    # --no-same-owner: los uid de Windows no existen dentro del contenedor y
    # sin esta opcion tar falla en cada fichero.
    tar -xzf /tmp/dist.tar.gz -C $BASE --no-same-owner -m
    rm -f /tmp/dist.tar.gz
    chown -R www-data:www-data $BASE
    systemctl reload nginx
  '
  rm -f /tmp/xenlor-dist.tar.gz
"
rm -f /tmp/xenlor-dist.tar.gz
echo "==> listo"

# PENDIENTE: el script anterior desplegaba a releases/<fecha> y cambiaba un
# symlink, de modo que no habia ningun instante con la web a medias y quedaban
# las 3 ultimas versiones para volver atras. Se perdio al cambiar de servidor.
# Para recuperarlo hay que apuntar el root de nginx a $BASE/current.
