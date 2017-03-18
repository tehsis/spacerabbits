#! /bin/bash
##
# mongodb-set-protocol-version.sh
#
# Sets the protocol version for the replica set
##
set -e

function usage() {
    echo "`basename $0` (0|1)"
}

PROTO_VERSION=$1

if [[ "1" != "$PROTO_VERSION" && "0" != "$PROTO_VERSION" ]]
then
  usage
  exit 1
fi

DBCONNECT=`sed -n '/DB[ ]*=.*/p' /etc/auth0.config`
DBUSER=`echo $DBCONNECT | sed -E 's/^(DB\s*=\s*\"mongodb:\/\/)(.*):(.*)\@(.*)\/(.*)/\2/'`
DBPWD=`echo $DBCONNECT | sed -E 's/^(DB\s*=\s*\"mongodb:\/\/)(.*):(.*)\@(.*)\/(.*)/\3/'`
REPLICA=`echo $DBCONNECT | sed -E 's/^(DB\s*=\s*\"mongodb:\/\/)(.*):(.*)\@(.*)\/(.*)/\4/'`

echo "Reconfiguring protocol version"

mongo --host "a0/$REPLICA" admin -u siteRootAdmin -p "$DBPWD" --eval "
  var cfg = rs.conf();
  cfg.protocolVersion = $PROTO_VERSION;
  rs.reconfig(cfg);
"

echo "Protocol version reconfigured.  New configuration: "
mongo --host "a0/$REPLICA" admin -u siteRootAdmin -p "$DBPWD" --eval "rs.conf()"