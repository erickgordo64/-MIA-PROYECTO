const oracledb = require('oracledb');
oracledb.initOracleClient({configDir: '/opt/oracle/instantclient_19_9/network/admin'});

cns = {
    user: "HR",
    password: "1234",
    connectString : "172.17.0.1/xe",
}


async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;